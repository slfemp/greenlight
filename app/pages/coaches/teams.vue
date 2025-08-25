<script setup lang="ts">
import type { Team } from '~/types'

const { data: teams, status } = await useFetch<Team[]>('/api/teams')
const router = useRouter()

// Calculate aggregated stats for each team
const teamsWithStats = ref([])

onMounted(async () => {
  if (!teams.value) return
  
  const statsPromises = teams.value.map(async (team) => {
    const { data } = await $fetch(`/api/teams/${team.id}`)
    return data
  })
  
  teamsWithStats.value = await Promise.all(statsPromises)
})

function createNewTeam() {
  router.push('/coaches/teams/create')
}

function editTeam(teamId: string) {
  router.push(`/coaches/teams/${teamId}/edit`)
}

function viewTeamRoster(teamId: string) {
  router.push(`/coaches/roster?team=${teamId}`)
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Team',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UChip, { 
          size: 'xs',
          color: 'neutral',
          style: { backgroundColor: row.original.primaryColor, color: row.original.secondaryColor }
        }, () => row.original.abbreviation),
        h('div', [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
          h('p', { class: 'text-xs text-muted' }, `Division: ${row.original.division}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'coach',
    header: 'Head Coach'
  },
  {
    accessorKey: 'playerCount',
    header: 'Roster Size',
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.original.playerCount || 0)
    }
  },
  {
    id: 'status-breakdown',
    header: 'Player Status',
    cell: ({ row }) => {
      const total = row.original.playerCount || 0
      const active = row.original.activePlayerCount || 0
      const caution = row.original.cautionPlayerCount || 0
      const resting = row.original.restingPlayerCount || 0
      
      return h('div', { class: 'flex items-center gap-1' }, [
        h(UBadge, { color: 'success', variant: 'subtle', size: 'xs' }, () => active),
        h(UBadge, { color: 'warning', variant: 'subtle', size: 'xs' }, () => caution),
        h(UBadge, { color: 'error', variant: 'subtle', size: 'xs' }, () => resting)
      ])
    }
  },
  {
    accessorKey: 'homeField',
    header: 'Home Field'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h('div', { class: 'text-right' }, 
        h(UButton, {
          to: `/coaches/roster?team=${row.original.id}`,
          icon: 'i-lucide-arrow-right',
          color: 'neutral',
          variant: 'ghost',
          size: 'sm'
        })
      )
    }
  }
]
</script>

<template>
  <UDashboardPanel id="teams">
    <template #header>
      <UDashboardNavbar title="Teams Management">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        
        <template #right>
          <UButton 
            icon="i-lucide-plus" 
            color="primary"
            @click="createNewTeam"
          >
            New Team
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- Stats Overview -->
      <UCard class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-3xl font-bold text-highlighted">{{ teams?.length || 0 }}</p>
            <p class="text-sm text-muted">Total Teams</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-highlighted">
              {{ teamsWithStats.reduce((sum, t) => sum + (t.playerCount || 0), 0) }}
            </p>
            <p class="text-sm text-muted">Total Players</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-success">
              {{ teamsWithStats.reduce((sum, t) => sum + (t.activePlayerCount || 0), 0) }}
            </p>
            <p class="text-sm text-muted">Active Players</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-error">
              {{ teamsWithStats.reduce((sum, t) => sum + (t.restingPlayerCount || 0), 0) }}
            </p>
            <p class="text-sm text-muted">Resting Players</p>
          </div>
        </div>
      </UCard>

      <!-- Loading State -->
      <div v-if="status === 'pending'" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span class="ml-2">Loading teams...</span>
      </div>

      <!-- Team Cards Grid -->
      <div v-else-if="teams && teams.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UCard 
          v-for="team in teams" 
          :key="team.id"
          class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          :style="{ borderColor: team.primaryColor }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  :style="{ backgroundColor: team.primaryColor }"
                >
                  {{ team.abbreviation }}
                </div>
                <div>
                  <h3 class="font-semibold text-lg">{{ team.name }}</h3>
                  <p class="text-sm text-muted">{{ team.division }} Division</p>
                </div>
              </div>
              
              <UDropdownMenu 
                :items="[
                  [{
                    label: 'View Roster',
                    icon: 'i-lucide-users',
                    click: () => viewTeamRoster(team.id)
                  }],
                  [{
                    label: 'Edit Team',
                    icon: 'i-lucide-edit',
                    click: () => editTeam(team.id)
                  }, {
                    label: 'Delete Team',
                    icon: 'i-lucide-trash',
                    color: 'error'
                  }]
                ]"
              >
                <UButton 
                  icon="i-lucide-more-vertical" 
                  variant="ghost" 
                  color="gray"
                  size="sm"
                />
              </UDropdownMenu>
            </div>
          </template>

          <div class="space-y-4">
            <!-- Team Info -->
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-muted">Head Coach</p>
                <p class="font-medium">{{ team.coach }}</p>
              </div>
              <div>
                <p class="text-muted">Established</p>
                <p class="font-medium">{{ team.established }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-muted">Home Field</p>
                <p class="font-medium">{{ team.homeField }}</p>
              </div>
            </div>

            <!-- Player Stats -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p class="text-2xl font-bold text-highlighted">
                    {{ teamsWithStats.find(t => t.id === team.id)?.playerCount || 0 }}
                  </p>
                  <p class="text-xs text-muted">Players</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-success">
                    {{ teamsWithStats.find(t => t.id === team.id)?.activePlayerCount || 0 }}
                  </p>
                  <p class="text-xs text-muted">Active</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-error">
                    {{ teamsWithStats.find(t => t.id === team.id)?.restingPlayerCount || 0 }}
                  </p>
                  <p class="text-xs text-muted">Resting</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 pt-2">
              <UButton 
                size="sm" 
                color="primary" 
                variant="soft" 
                icon="i-lucide-users"
                class="flex-1"
                @click="viewTeamRoster(team.id)"
              >
                View Roster
              </UButton>
              <UButton 
                size="sm" 
                color="gray" 
                variant="soft" 
                icon="i-lucide-edit"
                @click="editTeam(team.id)"
              >
                Edit
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <UIcon name="i-lucide-shield" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No teams found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Create your first team to get started.</p>
        <UButton color="primary" @click="createNewTeam">
          Create Team
        </UButton>
      </div>
    </template>
  </UDashboardPanel>
</template>
