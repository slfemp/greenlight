<script setup lang="ts">
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isToday, 
  addMonths, 
  subMonths,
  isSameDay,
  addDays
} from 'date-fns'

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Practice Session',
    date: new Date(),
    time: '3:00 PM',
    type: 'practice',
    team: 'Green Light Legends'
  },
  {
    id: 2,
    title: 'Game vs River City',
    date: addDays(new Date(), 2),
    time: '7:00 PM',
    type: 'game',
    team: 'Green Light Legends'
  },
  {
    id: 3,
    title: 'Team Meeting',
    date: addDays(new Date(), 5),
    time: '2:00 PM',
    type: 'meeting',
    team: 'All Teams'
  },
  {
    id: 4,
    title: 'Training Camp',
    date: addDays(new Date(), 7),
    time: '10:00 AM',
    type: 'training',
    team: 'Mountain Miners'
  },
  {
    id: 5,
    title: 'Championship Game',
    date: addDays(new Date(), 12),
    time: '6:30 PM',
    type: 'game',
    team: 'Coastal Crushers'
  }
]

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

const monthStart = computed(() => startOfMonth(currentDate.value))
const monthEnd = computed(() => endOfMonth(currentDate.value))
const calendarStart = computed(() => startOfWeek(monthStart.value))
const calendarEnd = computed(() => endOfWeek(monthEnd.value))

const calendarDays = computed(() => {
  return eachDayOfInterval({
    start: calendarStart.value,
    end: calendarEnd.value
  })
})

const monthYear = computed(() => format(currentDate.value, 'MMMM yyyy'))

function previousMonth() {
  currentDate.value = subMonths(currentDate.value, 1)
}

function nextMonth() {
  currentDate.value = addMonths(currentDate.value, 1)
}

function selectDate(date: Date) {
  selectedDate.value = date
}

function getEventsForDate(date: Date) {
  return sampleEvents.filter(event => isSameDay(event.date, date))
}

function getEventTypeColor(type: string) {
  switch (type) {
    case 'game': return 'red'
    case 'practice': return 'green'
    case 'training': return 'emerald'
    case 'meeting': return 'yellow'
    default: return 'gray'
  }
}

function getEventTypeIcon(type: string) {
  switch (type) {
    case 'game': return 'i-lucide-trophy'
    case 'practice': return 'i-lucide-play-circle'
    case 'training': return 'i-lucide-dumbbell'
    case 'meeting': return 'i-lucide-users'
    default: return 'i-lucide-calendar'
  }
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Icon name="i-lucide-calendar" class="w-5 h-5 text-green-600" />
          <h2 class="text-lg font-semibold">{{ monthYear }}</h2>
        </div>
        <div class="flex items-center space-x-2">
          <UButton
            icon="i-lucide-chevron-left"
            variant="outline"
            size="sm"
            color="green"
            @click="previousMonth"
          />
          <UButton
            label="Today"
            variant="outline"
            size="sm"
            color="green"
            @click="currentDate = new Date()"
          />
          <UButton
            icon="i-lucide-chevron-right"
            variant="outline"
            size="sm"
            color="green"
            @click="nextMonth"
          />
        </div>
      </div>
    </template>

    <div class="flex">
      <!-- Calendar Grid -->
      <div class="flex-1">
        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 gap-1 mb-4">
          <div 
            v-for="day in weekdays" 
            :key="day"
            class="p-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center uppercase"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="day in calendarDays"
            :key="day.toISOString()"
            class="relative min-h-[120px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-colors"
            :class="{
              'bg-green-900 dark:bg-green-950': !isSameMonth(day, currentDate),
              'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-400': selectedDate && isSameDay(day, selectedDate),
              'bg-green-800 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700': isSameMonth(day, currentDate)
            }"
            @click="selectDate(day)"
          >
            <!-- Day Number -->
            <div 
              class="flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full"
              :class="{
                'text-green-200 dark:text-green-300': !isSameMonth(day, currentDate),
                'text-white dark:text-white': isSameMonth(day, currentDate) && !isToday(day),
                'bg-green-500 text-white': isToday(day)
              }"
            >
              {{ format(day, 'd') }}
            </div>

            <!-- Events for this day -->
            <div class="mt-1 space-y-1">
              <div
                v-for="event in getEventsForDate(day).slice(0, 3)"
                :key="event.id"
                class="text-xs px-2 py-1 rounded-md truncate"
                :class="`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800 dark:bg-${getEventTypeColor(event.type)}-900 dark:text-${getEventTypeColor(event.type)}-200`"
              >
                {{ event.title }}
              </div>
              
              <!-- Show "more" indicator if there are more than 3 events -->
              <div 
                v-if="getEventsForDate(day).length > 3"
                class="text-xs text-gray-500 dark:text-gray-400 px-2"
              >
                +{{ getEventsForDate(day).length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Details Sidebar -->
      <div v-if="selectedDate" class="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ format(selectedDate, 'EEEE, MMMM d') }}
        </h3>

        <div class="space-y-3">
          <div
            v-for="event in getEventsForDate(selectedDate)"
            :key="event.id"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-start space-x-3">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                :class="`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-600 dark:bg-${getEventTypeColor(event.type)}-900 dark:text-${getEventTypeColor(event.type)}-300`"
              >
                <Icon :name="getEventTypeIcon(event.type)" class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ event.title }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ event.time }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ event.team }}
                </p>
              </div>
            </div>
          </div>

          <!-- No events message -->
          <div v-if="getEventsForDate(selectedDate).length === 0" class="text-center py-8">
            <Icon name="i-lucide-calendar-x" class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p class="text-sm text-gray-500 dark:text-gray-400">No events scheduled</p>
          </div>
        </div>

        <!-- Add Event Button -->
        <div class="mt-6">
          <UButton
            label="Add Event"
            icon="i-lucide-plus"
            block
            variant="outline"
            color="green"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
