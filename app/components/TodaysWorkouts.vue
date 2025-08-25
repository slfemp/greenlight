<script setup lang="ts">
interface Exercise {
  name: string
  sets: number
  reps?: number
  duration?: string
  rest: string
}

interface Workout {
  id: string
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  exercises: Exercise[]
  completed?: boolean
}

const props = defineProps<{
  workouts?: Workout[]
}>()

// Mock data for demonstration
const defaultWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Morning Arm Care',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: '15 min',
    exercises: [
      { name: 'Arm Circles', sets: 2, reps: 10, rest: '30s' },
      { name: 'Shoulder Stretches', sets: 3, duration: '30s', rest: '15s' },
      { name: 'Band Pull-Aparts', sets: 2, reps: 15, rest: '30s' }
    ],
    completed: false
  },
  {
    id: '2',
    title: 'Core Strength',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '25 min',
    exercises: [
      { name: 'Plank Hold', sets: 3, duration: '45s', rest: '60s' },
      { name: 'Russian Twists', sets: 3, reps: 20, rest: '45s' },
      { name: 'Dead Bug', sets: 2, reps: 12, rest: '30s' }
    ],
    completed: true
  }
]

const displayWorkouts = computed(() => {
  return props.workouts || defaultWorkouts
})

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner': return 'green'
    case 'Intermediate': return 'yellow'
    case 'Advanced': return 'red'
    default: return 'gray'
  }
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'strength': return 'i-lucide-dumbbell'
    case 'cardio': return 'i-lucide-heart'
    case 'flexibility': return 'i-lucide-stretch-horizontal'
    case 'agility': return 'i-lucide-zap'
    default: return 'i-lucide-activity'
  }
}

// Navigation function
const router = useRouter()

function startWorkout(workoutId: string) {
  router.push(`/players/workout-session?program=${workoutId}`)
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <UIcon name="i-lucide-clipboard-list" class="w-5 h-5" />
          <h3 class="text-lg font-semibold">Today's Workouts</h3>
        </div>
        <UBadge variant="soft" size="sm">
          {{ displayWorkouts.length }}
        </UBadge>
      </div>
    </template>

    <div class="space-y-3">
      <div 
        v-for="workout in displayWorkouts" 
        :key="workout.id"
        class="p-4 rounded-lg border-2 transition-all duration-200"
        :class="workout.completed 
          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
          : 'bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-800/50 hover:border-green-300'"
      >
        <!-- Workout Header -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-2">
            <UIcon :name="getCategoryIcon(workout.category)" class="w-5 h-5 text-primary-600" />
            <div>
              <h4 class="font-semibold text-sm">{{ workout.title }}</h4>
              <div class="flex items-center space-x-2 mt-1">
                <UBadge :color="getDifficultyColor(workout.difficulty)" variant="soft" size="xs">
                  {{ workout.difficulty }}
                </UBadge>
                <span class="text-xs text-muted">{{ workout.duration }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="workout.completed" class="flex-shrink-0">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600" />
          </div>
        </div>

        <!-- Exercise List -->
        <div class="space-y-2">
          <div 
            v-for="(exercise, index) in workout.exercises.slice(0, 3)" 
            :key="index"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-muted">{{ exercise.name }}</span>
            <span class="text-xs text-muted">
              {{ exercise.sets }} sets
              <template v-if="exercise.reps"> • {{ exercise.reps }} reps</template>
              <template v-if="exercise.duration"> • {{ exercise.duration }}</template>
            </span>
          </div>
          
          <div v-if="workout.exercises.length > 3" class="text-xs text-muted text-center pt-2">
            +{{ workout.exercises.length - 3 }} more exercises
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-4">
          <UButton 
            v-if="!workout.completed"
            size="sm" 
            color="primary" 
            variant="soft" 
            class="w-full"
            icon="i-lucide-play"
            @click="startWorkout(workout.id)"
          >
            Start Workout
          </UButton>
          <UButton 
            v-else
            size="sm" 
            color="green" 
            variant="soft" 
            class="w-full"
            icon="i-lucide-check"
            disabled
          >
            Completed
          </UButton>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="displayWorkouts.length === 0" class="text-center py-8">
        <UIcon name="i-lucide-clipboard-x" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p class="text-sm text-muted">No workouts scheduled for today</p>
        <UButton size="sm" variant="outline" class="mt-2">
          Browse Workouts
        </UButton>
      </div>
    </div>
  </UCard>
</template>
