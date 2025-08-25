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
}

const props = defineProps<{
  workout?: Workout
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:isOpen': [value: boolean]
}>()

// Computed property for modal open state
const modalOpen = computed({
  get: () => props.isOpen,
  set: (value: boolean) => {
    if (!value) {
      emit('close')
    }
    emit('update:isOpen', value)
  }
})

// Default workout for preview
const defaultWorkout: Workout = {
  id: '1',
  title: 'Morning Strength Routine',
  category: 'Strength',
  difficulty: 'Intermediate',
  duration: '45 min',
  exercises: [
    { name: 'Push-ups', sets: 3, reps: 15, rest: '60s' },
    { name: 'Squats', sets: 3, reps: 12, rest: '60s' },
    { name: 'Planks', sets: 3, duration: '30s', rest: '30s' },
    { name: 'Pull-ups', sets: 3, reps: 8, rest: '90s' }
  ]
}

const displayWorkout = computed(() => props.workout || defaultWorkout)

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
</script>

<template>
  <UModal v-model="modalOpen" prevent-close>
    <UCard class="max-w-2xl mx-auto">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UIcon :name="getCategoryIcon(displayWorkout.category)" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ displayWorkout.title }}</h3>
              <p class="text-sm text-muted">{{ displayWorkout.category }} • {{ displayWorkout.duration }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge :color="getDifficultyColor(displayWorkout.difficulty)" variant="soft" size="sm">
              {{ displayWorkout.difficulty }}
            </UBadge>
            <UButton icon="i-lucide-x" variant="ghost" size="sm" @click="emit('close')" />
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Workout Overview -->
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="p-3 bg-primary/5 rounded-lg">
            <p class="text-lg font-semibold text-highlighted">{{ displayWorkout.exercises.length }}</p>
            <p class="text-xs text-muted uppercase">Exercises</p>
          </div>
          <div class="p-3 bg-primary/5 rounded-lg">
            <p class="text-lg font-semibold text-highlighted">{{ displayWorkout.duration }}</p>
            <p class="text-xs text-muted uppercase">Duration</p>
          </div>
          <div class="p-3 bg-primary/5 rounded-lg">
            <p class="text-lg font-semibold text-highlighted">{{ displayWorkout.difficulty }}</p>
            <p class="text-xs text-muted uppercase">Level</p>
          </div>
        </div>

        <!-- Exercise List -->
        <div class="space-y-3">
          <h4 class="font-semibold text-highlighted">Exercises</h4>
          <div class="space-y-2">
            <div
              v-for="(exercise, index) in displayWorkout.exercises"
              :key="index"
              class="flex items-center justify-between p-3 bg-primary/5 rounded-lg"
            >
              <div>
                <p class="font-medium text-highlighted">{{ exercise.name }}</p>
                <p class="text-sm text-muted">
                  {{ exercise.sets }} sets
                  <template v-if="exercise.reps"> • {{ exercise.reps }} reps</template>
                  <template v-if="exercise.duration"> • {{ exercise.duration }}</template>
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-muted">Rest: {{ exercise.rest }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3 pt-4 border-t">
          <UButton color="primary" class="flex-1" icon="i-lucide-play">
            Start Workout
          </UButton>
          <UButton variant="outline" class="flex-1" @click="emit('close')">
            Close
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>