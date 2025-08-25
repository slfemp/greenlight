<script setup lang="ts">
import type { Player, Team } from '~/types'
import PlayerCard from '~/components/coaches/PlayerCard.vue'
import TeamSelector from '~/components/coaches/TeamSelector.vue'

const route = useRoute()
const router = useRouter()

const { data: players, status } = await useFetch<Player[]>('/api/roster', {
  lazy: true
})

const { data: teams } = await useFetch<Team[]>('/api/teams')

const selectedTeamId = ref<string | undefined>(route.query.team as string | undefined)
const selectedTeam = computed(() => teams.value?.find(t => t.id === selectedTeamId.value))

const filteredPlayers = computed(() => {
  if (!players.value) return []
  if (!selectedTeamId.value) return players.value
  return players.value.filter(p => p.teamId === selectedTeamId.value)
})

// Calculate stats for overview
const playerStats = computed(() => {
  const total = filteredPlayers.value.length
  const active = filteredPlayers.value.filter(p => p.status === 'green').length
  const caution = filteredPlayers.value.filter(p => p.status === 'yellow').length
  const resting = filteredPlayers.value.filter(p => p.status === 'red').length
  
  return { total, active, caution, resting }
})

function handleTeamSelect(teamId: string | undefined) {
  selectedTeamId.value = teamId
  // Update URL without triggering navigation
  router.replace({ 
    query: teamId ? { team: teamId } : {} 
  })
}
</script>

<template>
  <UDashboardPanel id="players">
    <template #header>
      <UDashboardNavbar :title="selectedTeam ? `${selectedTeam.name} Roster` : 'Player Management'">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <div class="flex items-center gap-2">
            <UChip v-if="selectedTeam" size="md" color="neutral">
              {{ selectedTeam.abbreviation }}
            </UChip>
            <UButton 
              icon="i-lucide-user-plus" 
              color="primary"
              to="/coaches/players/create"
            >
              New Player
            </UButton>
          </div>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- Debug Info -->
      <div v-if="$route.query.debug" class="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
        <h4 class="font-semibold mb-2">Debug Info:</h4>
        <p>Status: {{ status }}</p>
        <p>Teams count: {{ teams?.length || 0 }}</p>
        <p>Players count: {{ players?.length || 0 }}</p>
        <p>Filtered players count: {{ filteredPlayers.length }}</p>
        <p>Selected team ID: {{ selectedTeamId }}</p>
      </div>

      <!-- Team Selector -->
      <TeamSelector 
        v-if="teams && teams.length > 0" 
        :teams="teams" 
        :selected-team-id="selectedTeamId"
        @select-team="handleTeamSelect"
      />

      <!-- Stats Overview -->
      <UCard class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-3xl font-bold text-highlighted">{{ playerStats.total }}</p>
            <p class="text-sm text-muted">{{ selectedTeam ? 'Team Players' : 'Total Players' }}</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-success">{{ playerStats.active }}</p>
            <p class="text-sm text-muted">Active (Green)</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-warning">{{ playerStats.caution }}</p>
            <p class="text-sm text-muted">Caution (Yellow)</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-error">{{ playerStats.resting }}</p>
            <p class="text-sm text-muted">Resting (Red)</p>
          </div>
        </div>
      </UCard>

      <!-- Loading State -->
      <div v-if="status === 'pending'" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span class="ml-2">Loading players...</span>
      </div>

      <!-- Baseball Cards Grid -->
      <div v-else-if="filteredPlayers && filteredPlayers.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <PlayerCard
          v-for="player in filteredPlayers"
          :key="player.id"
          :player="player"
          :team="teams?.find(t => t.id === player.teamId)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <UIcon name="i-lucide-users" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ selectedTeam ? 'No players in this team' : 'No players found' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {{ selectedTeam ? 'This team doesn\'t have any players yet.' : 'Create your first player to get started.' }}
        </p>
        <UButton color="primary" to="/coaches/players/create">
          Create Player
        </UButton>
        <p class="text-sm text-gray-400 mt-4">
          Add ?debug=1 to the URL to see debug info
        </p>
      </div>
    </template>
  </UDashboardPanel>
</template>