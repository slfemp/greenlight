<script setup lang="ts">
import type { Player } from '~/types'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'

definePageMeta({ layout: 'mobile' })

// Mock player data - in real app this would come from authentication/user context
const currentPlayer: Player = {
  id: 1,
  name: 'Alex Smith',
  avatar: { src: 'https://i.pravatar.cc/128?u=1' },
  status: 'green',
  teamId: 'gll',
  position: 'Pitcher',
  jerseyNumber: '21',
  birthDate: '2008-03-15'
}

// Fetch team data
const { data: teams } = await useFetch('/api/teams')
const playerTeam = computed(() => teams.value?.find(t => t.id === currentPlayer.teamId))

// Generate 30 days of pitch count data
const pitchData = computed(() => {
  const data = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate realistic pitch counts with some variation
    const baseCount = 45 + Math.sin(i * 0.2) * 15 + Math.random() * 20
    const count = Math.max(0, Math.round(baseCount))
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
      day: i
    })
  }
  
  return data
})

const totalPitches = computed(() => {
  return pitchData.value.reduce((sum, entry) => sum + entry.count, 0)
})

// Chart accessor functions for Unovis
const x = (_: any, i: number) => i
const y = (d: any) => d.count
const xTicks = (i: number) => {
  if (i === 0 || i === pitchData.value.length - 1 || !pitchData.value[i]) {
    return ''
  }
  return pitchData.value[i].date
}
const template = (d: any) => `${d.date}: ${d.count} pitches`
</script>

<template>
  <div class="space-y-4">
    <!-- Player Profile Card -->
    <div class="p-4">
      <div class="bg-transparent">
        <!-- Player Name and Status -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-green-900">{{ currentPlayer.name }}</h1>
          <StatusIndicator :status="currentPlayer.status" size="md" />
        </div>

        <!-- 30-Day Pitches Graph -->
        <UCard>
          <template #header>
            <div>
              <p class="text-xs text-muted uppercase mb-1.5">
                Pitches Per Day
              </p>
              <p class="text-3xl text-highlighted font-semibold">
                {{ Math.round(totalPitches / 30) }}
              </p>
              <p class="text-xs text-muted">
                Average this period
              </p>
            </div>
          </template>

          <VisXYContainer
            :data="pitchData"
            :padding="{ top: 40 }"
            class="h-64"
          >
            <VisLine
              :x="x"
              :y="y"
              color="var(--ui-primary)"
            />
            <VisArea
              :x="x"
              :y="y"
              color="var(--ui-primary)"
              :opacity="0.1"
            />

            <VisAxis
              type="x"
              :x="x"
              :tick-format="xTicks"
            />

            <VisCrosshair
              color="var(--ui-primary)"
              :template="template"
            />

            <VisTooltip />
          </VisXYContainer>
        </UCard>
      </div>
    </div>

    <!-- Dashboard Content with Dark Green Background -->
    <div class="p-4 rounded-t-3xl space-y-4 pb-8" style="background-color: #081308;">
      <!-- Calendar Notifications -->
      <CalendarNotifications />

      <!-- Today's Workouts -->
      <TodaysWorkouts />
    </div>
  </div>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>


