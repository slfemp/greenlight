<script setup lang="ts">
import type { Player, Team, PlayerGameStat } from '~/types'
import { format } from 'date-fns'
import RosterDetailChart from '~/components/charts/RosterDetailChart.client.vue'

const route = useRoute()
const id = computed(() => Number(route.query.id || route.params.id))

const { data: roster, pending: rosterPending } = await useFetch<Player[]>('/api/roster')
const { data: teams, pending: teamsPending } = await useFetch<Team[]>('/api/teams')

const player = computed(() => roster.value?.find(p => p.id === id.value))
const team = computed(() => teams.value?.find(t => t.id === player.value?.teamId))

const metrics = [
  { label: 'Pitch Count', value: 'pitchCount' },
  { label: 'Pitches/Inning', value: 'pitchesPerInning' },
  { label: 'Innings Pitched', value: 'inningsPitched' },
  { label: 'Rest Days', value: 'restDays' }
]
const selectedMetric = ref<string>('pitchCount')

const formatXAxis = (date: Date) => format(date, 'MMM d')
const formatTooltip = (d: { date: Date, value: number }) => {
  const metricLabel = metrics.find(m => m.value === selectedMetric.value)?.label || selectedMetric.value
  return `${format(d.date, 'MMM d, yyyy')}: ${d.value} ${metricLabel}`
}

type StatPoint = { date: Date, value: number }
const points = computed<StatPoint[]>(() => {
  if (!player.value?.stats) return []
  
  return player.value.stats.map((s: PlayerGameStat) => ({
    date: new Date(s.date),
    value: Number(s[selectedMetric.value as keyof PlayerGameStat]) || 0
  }))
})
</script>

<template>
  <UDashboardPanel id="roster-details">
    <template #header>
      <UDashboardNavbar :title="player ? player.name : 'Player Details'">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="rosterPending || teamsPending" class="flex items-center justify-center h-96">
        <USkeleton class="h-8 w-48" />
      </div>
      
      <div v-else-if="!player" class="flex items-center justify-center h-96">
        <p class="text-muted">Player not found</p>
      </div>
      
      <div v-else class="grid gap-4">
        <UPageCard variant="subtle">
          <h3 class="text-lg font-medium text-highlighted mb-2">{{ player?.name || 'N/A' }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-muted uppercase mb-1">Team</p>
              <p class="text-highlighted font-medium">{{ team?.name || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-xs text-muted uppercase mb-1">Position</p>
              <p class="text-highlighted font-medium">{{ player?.position || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-xs text-muted uppercase mb-1">Jersey Number</p>
              <p class="text-highlighted font-medium">#{{ player?.jerseyNumber || 'N/A' }}</p>
            </div>
            <div>
              <div class="flex justify-center">
                <StatusIndicator :status="player?.status || 'green'" size="md" />
              </div>
            </div>
          </div>
        </UPageCard>

        <UCard :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
          <template #header>
            <div>
              <div class="flex items-center justify-between gap-3">
                <p class="text-xs text-muted uppercase">
                  {{ metrics.find(m => m.value === selectedMetric)?.label }} (This Month)
                </p>
                <UTabs v-model="selectedMetric" :items="metrics" size="xs" :content="false" />
              </div>
            </div>
          </template>
          
          <div v-if="!player?.stats || player.stats.length === 0" class="p-4 text-center text-muted">
            No stats available for this player
          </div>
          
          <RosterDetailChart 
            v-else
            :points="points" 
            :format-x-axis="formatXAxis"
            :format-tooltip="formatTooltip"
          />
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>


