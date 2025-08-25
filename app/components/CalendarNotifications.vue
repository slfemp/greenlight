<script setup lang="ts">
interface CalendarEvent {
  id: string
  title: string
  type: 'game' | 'workout' | 'practice' | 'rest'
  date: string
  time?: string
  location?: string
}

const props = defineProps<{
  events?: CalendarEvent[]
  maxEvents?: number
}>()

// Mock data for demonstration
const defaultEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'vs Rangers',
    type: 'game',
    date: '2024-12-30',
    time: '7:00 PM',
    location: 'Home Field'
  },
  {
    id: '2',
    title: 'Strength Training',
    type: 'workout',
    date: '2024-12-31',
    time: '10:00 AM',
    location: 'Training Center'
  },
  {
    id: '3',
    title: 'Team Practice',
    type: 'practice',
    date: '2025-01-02',
    time: '3:00 PM',
    location: 'Practice Field'
  },
  {
    id: '4',
    title: 'Rest Day',
    type: 'rest',
    date: '2025-01-03'
  }
]

const displayEvents = computed(() => {
  const eventsToShow = props.events || defaultEvents
  const maxToShow = props.maxEvents || 4
  return eventsToShow.slice(0, maxToShow)
})

function getEventIcon(type: string) {
  switch (type) {
    case 'game': return 'i-lucide-trophy'
    case 'workout': return 'i-lucide-dumbbell'
    case 'practice': return 'i-lucide-users'
    case 'rest': return 'i-lucide-moon'
    default: return 'i-lucide-calendar'
  }
}

function getEventColor(type: string) {
  switch (type) {
    case 'game': return 'green'
    case 'workout': return 'emerald'
    case 'practice': return 'lime'
    case 'rest': return 'slate'
    default: return 'slate'
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center space-x-2">
        <UIcon name="i-lucide-calendar" class="w-5 h-5" />
        <h3 class="text-lg font-semibold">Upcoming Events</h3>
      </div>
    </template>

    <div class="space-y-3">
      <div 
        v-for="event in displayEvents" 
        :key="event.id"
        class="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
      >
        <!-- Date -->
        <div class="flex-shrink-0 text-center min-w-[60px]">
          <div class="text-sm font-medium text-primary-600">
            {{ formatDate(event.date) }}
          </div>
          <div v-if="event.time" class="text-xs text-muted">
            {{ event.time }}
          </div>
        </div>

        <!-- Event Icon -->
        <div class="flex-shrink-0">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="`bg-${getEventColor(event.type)}-100 dark:bg-${getEventColor(event.type)}-900/20`"
          >
            <UIcon 
              :name="getEventIcon(event.type)" 
              class="w-4 h-4"
              :class="`text-${getEventColor(event.type)}-600 dark:text-${getEventColor(event.type)}-400`"
            />
          </div>
        </div>

        <!-- Event Details -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm truncate">{{ event.title }}</p>
          <p v-if="event.location" class="text-xs text-muted truncate">
            {{ event.location }}
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="displayEvents.length === 0" class="text-center py-6">
        <UIcon name="i-lucide-calendar-x" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p class="text-sm text-muted">No upcoming events</p>
      </div>
    </div>
  </UCard>
</template>
