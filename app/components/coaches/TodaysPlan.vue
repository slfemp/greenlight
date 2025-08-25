<script setup lang="ts">
// Today's workout plan
const workouts = [
  {
    time: '9:00 AM',
    title: 'Pitching Practice',
    duration: '45 min',
    type: 'skill'
  },
  {
    time: '10:00 AM',
    title: 'Batting Drills',
    duration: '60 min',
    type: 'training'
  },
  {
    time: '11:30 AM',
    title: 'Conditioning',
    duration: '30 min',
    type: 'fitness'
  },
  {
    time: '2:00 PM',
    title: 'Team Scrimmage',
    duration: '90 min',
    type: 'game'
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'skill': return 'blue'
    case 'training': return 'yellow'
    case 'fitness': return 'green'
    case 'game': return 'red'
    default: return 'gray'
  }
}
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Today's Plan
        </p>
        <p class="text-lg font-semibold">
          {{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div 
        v-for="workout in workouts" 
        :key="workout.time"
        class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <UBadge 
            :color="getTypeColor(workout.type)" 
            variant="soft" 
            size="xs"
          >
            {{ workout.type }}
          </UBadge>
          <div>
            <p class="font-medium text-sm">{{ workout.title }}</p>
            <p class="text-xs text-muted">{{ workout.duration }}</p>
          </div>
        </div>
        <div class="text-sm font-mono text-muted">
          {{ workout.time }}
        </div>
      </div>
    </div>
  </UCard>
</template>

