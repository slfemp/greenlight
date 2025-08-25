<script setup lang="ts">
import type { Player } from '~/types'

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
      count
    })
  }
  
  return data
})

const totalPitches = computed(() => {
  return pitchData.value.reduce((sum, entry) => sum + entry.count, 0)
})
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
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <h3 class="text-lg font-semibold text-green-900 mb-4 text-center">Pitches - Last 30 Days</h3>
          <div class="relative h-32 bg-gray-50 rounded-lg p-2">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <!-- Simple grid lines -->
              <defs>
                <pattern id="simpleGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#simpleGrid)" />
              
              <!-- Simple pitch count line -->
              <polyline
                :points="pitchData.map((entry, index) =>
                  `${(index / (pitchData.length - 1)) * 100},${100 - ((entry.count - Math.min(...pitchData.map(e => e.count))) / (Math.max(...pitchData.map(e => e.count)) - Math.min(...pitchData.map(e => e.count)))) * 80}`
                ).join(' ')"
                fill="none" 
                stroke="#059669" 
                stroke-width="2" 
                vector-effect="non-scaling-stroke"
              />
              
              <!-- Simple data points -->
              <circle
                v-for="(entry, index) in pitchData"
                :key="index"
                :cx="(index / (pitchData.length - 1)) * 100"
                :cy="100 - ((entry.count - Math.min(...pitchData.map(e => e.count))) / (Math.max(...pitchData.map(e => e.count)) - Math.min(...pitchData.map(e => e.count)))) * 80"
                r="1.5"
                fill="#059669"
                vector-effect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-2">
            <span>30 days ago</span>
            <span>{{ totalPitches }} total pitches</span>
            <span>Today</span>
          </div>
        </div>
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


