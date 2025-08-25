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
  description: string
  exercises: Exercise[]
  equipment: string[]
  targetAreas: string[]
}

const props = defineProps<{
  selectedWorkouts: Workout[]
}>()

const emit = defineEmits<{
  removeWorkout: [workoutId: string]
  clearAll: []
  saveRoutine: []
}>()

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
    case 'agility': return 'i-lucide-zap'
    case 'flexibility': return 'i-lucide-stretch-horizontal'
    case 'throwing': return 'i-lucide-target'
    case 'batting': return 'i-lucide-baseball'
    default: return 'i-lucide-activity'
  }
}

const totalDuration = computed(() => {
  if (props.selectedWorkouts.length === 0) return '0 min'
  
  const totalMinutes = props.selectedWorkouts.reduce((total, workout) => {
    const minutes = parseInt(workout.duration.replace(' min', ''))
    return total + minutes
  }, 0)
  
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }
  
  return `${totalMinutes} min`
})
</script>

<template>
  <div class="w-80 m-2 rounded-lg border border-green-600 dark:border-green-500 flex flex-col h-[calc(100%-1rem)] shadow-sm" :style="{ backgroundColor: '#0a1f0a' }">
    <!-- Header -->
    <div class="p-4 border-b border-green-600 dark:border-green-500">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold text-white">
          Selected Workouts
        </h3>
        <UBadge :label="selectedWorkouts.length.toString()" color="green" />
      </div>
      
      <!-- Action buttons -->
      <div class="space-y-2">
        <UButton
          label="Save Routine"
          icon="i-lucide-save"
          color="green"
          block
          :disabled="selectedWorkouts.length === 0"
          @click="emit('saveRoutine')"
        />
        <UButton
          label="Clear List"
          icon="i-lucide-trash-2"
          variant="outline"
          color="red"
          block
          :disabled="selectedWorkouts.length === 0"
          @click="emit('clearAll')"
        />
      </div>

      <!-- Summary stats -->
      <div v-if="selectedWorkouts.length > 0" class="mt-3 p-3 rounded-lg" :style="{ backgroundColor: '#102710' }">
        <div class="flex items-center justify-between text-sm">
          <span class="text-green-200">Total Duration:</span>
          <span class="font-medium text-white">{{ totalDuration }}</span>
        </div>
      </div>
    </div>

    <!-- Selected workouts list -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="selectedWorkouts.length === 0" class="p-4 text-center">
        <Icon name="i-lucide-clipboard-list" class="w-12 h-12 mx-auto mb-2 text-green-300" />
        <p class="text-sm text-green-200">No workouts selected</p>
        <p class="text-xs text-green-300">Choose workouts to build your routine</p>
      </div>

      <div v-else class="p-2 space-y-2">
        <div
          v-for="(workout, index) in selectedWorkouts"
          :key="workout.id"
          class="rounded-lg p-3 border border-green-600 dark:border-green-500"
          :style="{ backgroundColor: '#102710' }"
        >
          <!-- Workout item header -->
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2 flex-1 min-w-0">
              <span class="text-sm font-medium text-white bg-green-800 rounded px-2 py-1 min-w-fit">
                {{ index + 1 }}
              </span>
              <div class="min-w-0 flex-1">
                <h4 class="text-sm font-medium text-white truncate">
                  {{ workout.title }}
                </h4>
                <div class="flex items-center space-x-2 mt-1">
                  <Icon :name="getCategoryIcon(workout.category)" class="w-3 h-3 text-green-300" />
                  <span class="text-xs text-green-200">{{ workout.duration }}</span>
                </div>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              variant="ghost"
              size="xs"
              color="red"
              @click="emit('removeWorkout', workout.id)"
            />
          </div>

          <!-- Workout details -->
          <div class="flex items-center justify-between">
            <UBadge :color="getDifficultyColor(workout.difficulty)" variant="soft" size="xs">
              {{ workout.difficulty }}
            </UBadge>
            <span class="text-xs text-green-200">{{ workout.exercises.length }} exercises</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer info -->
    <div v-if="selectedWorkouts.length > 0" class="p-4 border-t border-green-600 dark:border-green-500" :style="{ backgroundColor: '#102710' }">
      <div class="text-xs text-green-200 space-y-1">
        <div class="flex justify-between">
          <span>Workouts:</span>
          <span>{{ selectedWorkouts.length }}</span>
        </div>
        <div class="flex justify-between">
          <span>Est. Duration:</span>
          <span>{{ totalDuration }}</span>
        </div>
        <div class="flex justify-between">
          <span>Exercises:</span>
          <span>{{ selectedWorkouts.reduce((total, w) => total + w.exercises.length, 0) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
