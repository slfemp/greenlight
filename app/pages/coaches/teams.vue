<script setup lang="ts">
import type { Team } from '~/types'

const { data: teams, status } = await useFetch<Team[]>('/api/teams')

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
      <UDashboardNavbar title="Teams Overview">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
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

      <UTable
        :data="teamsWithStats"
        :columns="columns"
        :loading="status === 'pending' || teamsWithStats.length === 0"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default'
        }"
      />
    </template>
  </UDashboardPanel>
</template>
