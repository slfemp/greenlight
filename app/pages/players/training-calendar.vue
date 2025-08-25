<script setup lang="ts">
import { addDays, startOfWeek, format, isSameDay, isToday } from 'date-fns'

definePageMeta({ layout: 'mobile' })

const activeTab = ref('training')
const scrollContainer = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)
const router = useRouter()
const route = useRoute()

// Check if we should show programs tab based on query parameter or navigation
onMounted(() => {
  if (route.query.tab === 'programs' || route.path.includes('programs')) {
    activeTab.value = 'programs'
  }
})

// Navigation function
const startWorkout = (programId: number) => {
  router.push(`/players/workout-session?program=${programId}`)
}

// Custom scroll indicator functionality
const updateScrollIndicator = () => {
  if (!scrollContainer.value || !scrollIndicator.value) return
  
  const container = scrollContainer.value as HTMLElement
  const indicator = scrollIndicator.value as HTMLElement
  
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth - container.clientWidth
  const scrollPercent = scrollWidth > 0 ? scrollLeft / scrollWidth : 0
  
  const indicatorTrackWidth = indicator.parentElement!.clientWidth - 40 // Account for margins
  const indicatorThumbWidth = 60 // Fixed thumb width
  const maxThumbPosition = indicatorTrackWidth - indicatorThumbWidth
  
  indicator.style.transform = `translateX(${scrollPercent * maxThumbPosition}px)`
}

const scrollToPosition = (event: MouseEvent) => {
  if (!scrollContainer.value) return
  
  const track = event.currentTarget as HTMLElement
  const rect = track.getBoundingClientRect()
  const clickX = event.clientX - rect.left - 20 // Account for margin
  const trackWidth = track.clientWidth - 40 // Account for margins
  const scrollPercent = Math.max(0, Math.min(1, clickX / trackWidth))
  
  const container = scrollContainer.value as HTMLElement
  const scrollWidth = container.scrollWidth - container.clientWidth
  container.scrollLeft = scrollPercent * scrollWidth
}

// Get current week
const currentDate = new Date()
const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday start
const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

// Mock training events data
const trainingEvents = [
  {
    id: 1,
    date: addDays(currentDate, 0),
    title: 'Strength Training',
    type: 'workout',
    time: '10:00 AM',
    duration: '45 min',
    category: 'Strength'
  },
  {
    id: 2,
    date: addDays(currentDate, 1),
    title: 'Cardio Session',
    type: 'workout',
    time: '3:00 PM',
    duration: '30 min',
    category: 'Cardio'
  },
  {
    id: 3,
    date: addDays(currentDate, 2),
    title: 'Team Practice',
    type: 'practice',
    time: '5:00 PM',
    duration: '2 hours',
    category: 'Practice'
  },
  {
    id: 4,
    date: addDays(currentDate, 3),
    title: 'Recovery Day',
    type: 'rest',
    time: 'All Day',
    duration: '',
    category: 'Recovery'
  },
  {
    id: 5,
    date: addDays(currentDate, 5),
    title: 'Game Day',
    type: 'game',
    time: '7:00 PM',
    duration: '3 hours',
    category: 'Game'
  }
]

// Mock programs data
const myPrograms = [
  {
    id: 1,
    title: 'Morning Strength Routine',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 15, weight: 'Body weight' },
      { name: 'Squats', sets: 3, reps: 12, weight: 'Body weight' },
      { name: 'Planks', sets: 3, reps: '30 seconds', weight: 'Body weight' },
      { name: 'Pull-ups', sets: 3, reps: 8, weight: 'Body weight' }
    ],
    estimatedTime: '25 min',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    title: 'Pitching Mechanics',
    exercises: [
      { name: 'Arm Circles', sets: 2, reps: 10, weight: 'Light resistance' },
      { name: 'Shoulder Blade Squeezes', sets: 3, reps: 15, weight: 'Body weight' },
      { name: 'Band Pull-Aparts', sets: 3, reps: 12, weight: 'Resistance band' },
      { name: 'Wall Slides', sets: 3, reps: 10, weight: 'Body weight' }
    ],
    estimatedTime: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    title: 'Core Stability',
    exercises: [
      { name: 'Dead Bug', sets: 3, reps: 10, weight: 'Body weight' },
      { name: 'Bird Dog', sets: 3, reps: 8, weight: 'Body weight' },
      { name: 'Side Planks', sets: 3, reps: '20 seconds', weight: 'Body weight' },
      { name: 'Russian Twists', sets: 3, reps: 15, weight: '10 lbs' }
    ],
    estimatedTime: '15 min',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    title: 'Explosive Power',
    exercises: [
      { name: 'Jump Squats', sets: 4, reps: 8, weight: 'Body weight' },
      { name: 'Medicine Ball Slams', sets: 3, reps: 10, weight: '12 lbs' },
      { name: 'Box Jumps', sets: 3, reps: 6, weight: 'Body weight' },
      { name: 'Burpees', sets: 3, reps: 5, weight: 'Body weight' },
      { name: 'Battle Ropes', sets: 4, reps: '30 seconds', weight: 'Heavy rope' }
    ],
    estimatedTime: '35 min',
    difficulty: 'Advanced'
  },
  {
    id: 5,
    title: 'Flexibility & Mobility',
    exercises: [
      { name: 'Hip Flexor Stretch', sets: 2, reps: '45 seconds', weight: 'Body weight' },
      { name: 'Shoulder Dislocations', sets: 2, reps: 15, weight: 'PVC pipe' },
      { name: 'Cat-Cow Pose', sets: 3, reps: 10, weight: 'Body weight' },
      { name: 'Leg Swings', sets: 2, reps: 12, weight: 'Body weight' },
      { name: 'Foam Rolling', sets: 1, reps: '5 minutes', weight: 'Foam roller' }
    ],
    estimatedTime: '20 min',
    difficulty: 'Beginner'
  }
]

// Check if a date has events
function hasEvents(date: Date) {
  return trainingEvents.some(event => isSameDay(event.date, date))
}

// Get events for a specific date
function getEventsForDate(date: Date) {
  return trainingEvents.filter(event => isSameDay(event.date, date))
}

// Get category color
function getCategoryColor(category: string) {
  switch (category) {
    case 'Strength': return 'green'
    case 'Cardio': return 'blue'
    case 'Practice': return 'purple'
    case 'Recovery': return 'gray'
    case 'Game': return 'red'
    default: return 'gray'
  }
}

// Get difficulty color
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner': return 'green'
    case 'Intermediate': return 'yellow'
    case 'Advanced': return 'red'
    default: return 'gray'
  }
}
</script>
<template>
  <div>
    <!-- Tab Navigation -->
    <div class="flex bg-green-50 dark:bg-green-900/20 w-full">
      <button
        @click="activeTab = 'training'"
        :class="[
          'flex-1 py-4 px-6 font-semibold transition-all duration-200',
          activeTab === 'training' 
            ? 'bg-green-800 text-white shadow-sm' 
            : 'text-green-800 hover:bg-green-100 dark:hover:bg-green-800/30'
        ]"
      >
        Training
      </button>
      <button
        @click="activeTab = 'programs'"
        :class="[
          'flex-1 py-4 px-6 font-semibold transition-all duration-200',
          activeTab === 'programs' 
            ? 'bg-green-800 text-white shadow-sm' 
            : 'text-green-800 hover:bg-green-100 dark:hover:bg-green-800/30'
        ]"
      >
        Programs
      </button>
    </div>

    <!-- Dashboard Content with Dark Green Background -->
    <div class="p-4 space-y-4" style="background-color: #071107; padding-bottom: 400px;">
      <!-- Training Tab -->
      <div v-if="activeTab === 'training'" class="space-y-4">
        <!-- Week Timeline -->
        <UCard class="hover:shadow-lg transition-shadow duration-200">
          <template #header>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-calendar" class="w-4 h-4 text-primary" />
              </div>
              <h3 class="text-lg font-semibold text-highlighted">This Week</h3>
            </div>
          </template>
          
          <div class="flex justify-between items-center">
            <div
              v-for="day in weekDays"
              :key="day.toISOString()"
              class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-primary/10 cursor-pointer"
              :class="{ 'bg-primary/20': isToday(day) }"
            >
              <div class="text-xs text-muted mb-1">
                {{ format(day, 'EEE') }}
              </div>
              <div class="relative">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  :class="isToday(day) ? 'bg-primary text-white' : 'text-highlighted'"
                >
                  {{ format(day, 'd') }}
                </div>
                <!-- Event Indicator Dot -->
                <div
                  v-if="hasEvents(day)"
                  class="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"
                ></div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Today's Events -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
            </div>
            <h3 class="text-lg font-semibold text-highlighted">Today's Schedule</h3>
          </div>
          
          <div v-if="getEventsForDate(currentDate).length > 0" class="grid grid-cols-1 gap-4">
            <UCard
              v-for="event in getEventsForDate(currentDate)"
              :key="event.id"
              class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-10 h-10 rounded-full flex items-center justify-center"
                      :class="`bg-${getCategoryColor(event.category)}-100`"
                    >
                      <UIcon name="i-lucide-dumbbell" :class="`w-5 h-5 text-${getCategoryColor(event.category)}-600`" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-lg text-highlighted">{{ event.title }}</h4>
                      <p class="text-sm text-muted">{{ event.category }}</p>
                    </div>
                  </div>
                  <UBadge :color="getCategoryColor(event.category)" variant="soft" size="sm">
                    {{ event.category }}
                  </UBadge>
                </div>
              </template>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Time</p>
                  <p class="font-medium text-highlighted">{{ event.time }}</p>
                </div>
                <div v-if="event.duration">
                  <p class="text-muted">Duration</p>
                  <p class="font-medium text-highlighted">{{ event.duration }}</p>
                </div>
              </div>
            </UCard>
          </div>
          
          <UCard v-else class="text-center py-12 hover:shadow-lg transition-shadow duration-200">
            <UIcon name="i-lucide-calendar-x" class="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 class="text-lg font-medium text-highlighted mb-2">No events scheduled</h3>
            <p class="text-muted">Enjoy your free day!</p>
          </UCard>
        </div>
      </div>

      <!-- My Programs Tab -->
      <div v-if="activeTab === 'programs'" class="space-y-6">
        <!-- Custom Scroll Indicator at Top -->
        <div class="relative mb-4">
          <div 
            class="h-2 bg-gray-200/30 rounded-full mx-5 cursor-pointer"
            @click="scrollToPosition"
          >
            <div 
              ref="scrollIndicator"
              class="h-2 w-15 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-transform duration-300 ease-out shadow-sm"
            ></div>
          </div>
        </div>
        
        <div class="relative pt-2">
          <div 
            ref="scrollContainer"
            class="flex overflow-x-auto space-x-4 pb-2 scroll-smooth snap-x snap-mandatory custom-scrollbar-hidden px-4"
            @scroll="updateScrollIndicator"
          >
            <UCard
              v-for="program in myPrograms"
              :key="program.id"
              class="flex-shrink-0 w-80 hover:shadow-lg transition-shadow duration-200 cursor-pointer snap-center mt-2"
            >
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UIcon name="i-lucide-dumbbell" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-highlighted">{{ program.title }}</h3>
                    <p class="text-sm text-muted">{{ program.exercises.length }} exercises</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UBadge :color="getDifficultyColor(program.difficulty)" variant="soft" size="sm">
                    {{ program.difficulty }}
                  </UBadge>
                  <UBadge color="primary" variant="soft" size="sm">
                    {{ program.estimatedTime }}
                  </UBadge>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <!-- Program Info -->
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Difficulty</p>
                  <p class="font-medium text-highlighted">{{ program.difficulty }}</p>
                </div>
                <div>
                  <p class="text-muted">Duration</p>
                  <p class="font-medium text-highlighted">{{ program.estimatedTime }}</p>
                </div>
              </div>

              <!-- Exercises List -->
              <div class="border-t pt-4">
                <div class="space-y-3">
                  <div
                    v-for="(exercise, index) in program.exercises"
                    :key="index"
                    class="flex items-center justify-between p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div>
                      <p class="font-medium text-highlighted">{{ exercise.name }}</p>
                      <p class="text-sm text-muted">
                        {{ exercise.sets }} sets × {{ exercise.reps }} • {{ exercise.weight }}
                      </p>
                    </div>
                    <UIcon name="i-lucide-circle" class="w-5 h-5 text-muted" />
                  </div>
                </div>
              </div>

              <!-- Start Workout Button -->
              <div class="flex space-x-2 pt-2">
                <UButton
                  color="primary"
                  size="lg"
                  class="flex-1"
                  icon="i-lucide-play"
                  @click="startWorkout(program.id)"
                >
                  Start Workout
                </UButton>
                <UButton
                  color="gray"
                  variant="soft"
                  size="lg"
                  icon="i-lucide-eye"
                >
                  Preview
                </UButton>
              </div>
            </div>
          </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide default scrollbar */
.custom-scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.custom-scrollbar-hidden::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Custom scroll indicator styling */
.scroll-indicator-track {
  background: rgba(229, 231, 235, 0.3);
  border-radius: 10px;
}

.scroll-indicator-thumb {
  background: linear-gradient(90deg, #00C16A, #00A155);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-indicator-thumb:hover {
  background: linear-gradient(90deg, #00A155, #007F45);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Smooth scrolling behavior */
.custom-scrollbar-hidden {
  scroll-behavior: smooth;
}
</style>
