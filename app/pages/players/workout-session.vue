<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const router = useRouter()

// Get program ID from query params
const programId = computed(() => route.query.program as string)

// Mock programs data (same as training-calendar)
const programs = [
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

// Find current program
const currentProgram = computed(() => 
  programs.find(p => p.id === parseInt(programId.value)) || programs[0]
)

// Workout state
const currentExerciseIndex = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

// Exercise tracking data
const exerciseData = ref(
  currentProgram.value.exercises.map(exercise => ({
    name: exercise.name,
    targetSets: exercise.sets,
    targetReps: exercise.reps,
    targetWeight: exercise.weight,
    completedSets: Array.from({ length: 4 }, () => ({
      reps: '',
      weight: '',
      completed: false
    }))
  }))
)

// Current exercise
const currentExercise = computed(() => exerciseData.value[currentExerciseIndex.value])

// Modal state
const showDeleteModal = ref(false)
const deleteTarget = ref({ exerciseIndex: -1, setIndex: -1 })

// Add set function
const addSet = (exerciseIndex: number) => {
  exerciseData.value[exerciseIndex].completedSets.push({
    reps: '',
    weight: '',
    completed: false
  })
}

// Show delete confirmation
const confirmDelete = (exerciseIndex: number, setIndex: number) => {
  deleteTarget.value = { exerciseIndex, setIndex }
  showDeleteModal.value = true
}

// Remove set function
const removeSet = () => {
  const { exerciseIndex, setIndex } = deleteTarget.value
  if (exerciseData.value[exerciseIndex].completedSets.length > 1) {
    exerciseData.value[exerciseIndex].completedSets.splice(setIndex, 1)
  }
  showDeleteModal.value = false
}

// Cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false
  deleteTarget.value = { exerciseIndex: -1, setIndex: -1 }
}

// Next exercise function
const nextExercise = () => {
  if (currentExerciseIndex.value < exerciseData.value.length - 1) {
    currentExerciseIndex.value++
    scrollToCurrentExercise()
  } else {
    // Workout complete
    router.push('/players/training-calendar')
  }
}

// Go to specific exercise
const goToExercise = (exerciseIndex: number) => {
  if (exerciseIndex === exerciseData.value.length - 1) {
    // Last exercise - go to workout review
    router.push(`/players/workout-review?program=${programId.value}`)
  } else {
    // Go to next exercise
    currentExerciseIndex.value = exerciseIndex + 1
    scrollToCurrentExercise()
  }
}

// Previous exercise function
const previousExercise = () => {
  if (currentExerciseIndex.value > 0) {
    currentExerciseIndex.value--
    scrollToCurrentExercise()
  }
}

// Scroll to current exercise
const scrollToCurrentExercise = () => {
  if (!scrollContainer.value) return
  
  const cardWidth = 320 + 16 // w-80 + gap
  const scrollPosition = currentExerciseIndex.value * cardWidth
  scrollContainer.value.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  })
}

// Custom scroll indicator functionality
const updateScrollIndicator = () => {
  if (!scrollContainer.value || !scrollIndicator.value) return
  
  const container = scrollContainer.value as HTMLElement
  const indicator = scrollIndicator.value as HTMLElement
  
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth - container.clientWidth
  const scrollPercent = scrollWidth > 0 ? scrollLeft / scrollWidth : 0
  
  const indicatorTrackWidth = indicator.parentElement!.clientWidth - 40
  const indicatorThumbWidth = 60
  const maxThumbPosition = indicatorTrackWidth - indicatorThumbWidth
  
  indicator.style.transform = `translateX(${scrollPercent * maxThumbPosition}px)`
}

const scrollToPosition = (event: MouseEvent) => {
  if (!scrollContainer.value) return
  
  const track = event.currentTarget as HTMLElement
  const rect = track.getBoundingClientRect()
  const clickX = event.clientX - rect.left - 20
  const trackWidth = track.clientWidth - 40
  const scrollPercent = Math.max(0, Math.min(1, clickX / trackWidth))
  
  const container = scrollContainer.value as HTMLElement
  const scrollWidth = container.scrollWidth - container.clientWidth
  container.scrollLeft = scrollPercent * scrollWidth
}

// Initialize
onMounted(() => {
  scrollToCurrentExercise()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex bg-green-50 dark:bg-green-900/20 w-full p-4">
      <div class="flex items-center justify-between w-full">
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          size="xl"
          :disabled="currentExerciseIndex === 0"
          :class="currentExerciseIndex === 0 ? 'text-gray-400' : 'text-green-800 hover:text-green-900'"
          @click="previousExercise"
        />
        <div class="text-center">
          <h1 class="text-lg font-semibold text-green-800">{{ currentProgram.title }}</h1>
          <p class="text-sm text-green-600">
            Exercise {{ currentExerciseIndex + 1 }} of {{ exerciseData.length }}
          </p>
        </div>
        <UButton
          icon="i-lucide-chevron-right"
          variant="ghost"
          size="xl"
          :disabled="currentExerciseIndex === exerciseData.length - 1"
          :class="currentExerciseIndex === exerciseData.length - 1 ? 'text-gray-400' : 'text-green-800 hover:text-green-900'"
          @click="nextExercise"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-4 space-y-4" style="background-color: #071107; padding-bottom: 400px;">
      <!-- Custom Scroll Indicator -->
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

      <!-- Exercise Cards Container -->
      <div class="relative pt-2">
        <div 
          ref="scrollContainer"
          class="flex overflow-x-auto space-x-4 pb-6 scroll-smooth snap-x snap-mandatory custom-scrollbar-hidden px-4"
          @scroll="updateScrollIndicator"
        >
          <UCard
            v-for="(exercise, exerciseIndex) in exerciseData"
            :key="exerciseIndex"
            class="flex-shrink-0 w-80 hover:shadow-lg transition-shadow duration-200 snap-center mt-2"
          >
            <template #header>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UIcon name="i-lucide-dumbbell" class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg text-highlighted">{{ exercise.name }}</h3>
                    </div>
                  </div>
                  <UBadge color="primary" variant="soft" size="sm">
                    {{ exercise.targetWeight }}
                  </UBadge>
                </div>
                
                <!-- Target Information -->
                <div class="w-full px-2 py-1 border border-green-500 rounded-md text-sm text-green-600 dark:text-green-400 text-center">
                  Target: {{ exercise.targetSets }} sets × {{ exercise.targetReps }}
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <!-- Sets Tracking -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-medium text-highlighted">Sets</h4>
                  <UButton
                    icon="i-lucide-plus"
                    size="xs"
                    variant="soft"
                    color="primary"
                    @click="addSet(exerciseIndex)"
                  >
                    Add Set
                  </UButton>
                </div>

                <div class="space-y-2">
                  <div
                    v-for="(set, setIndex) in exercise.completedSets"
                    :key="setIndex"
                    class="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg"
                  >
                    <div class="flex items-center space-x-2 flex-1">
                      <span class="text-sm font-medium text-muted w-8">{{ setIndex + 1 }}</span>
                      
                      <!-- Reps Input -->
                      <div class="flex-1">
                        <label class="block text-xs text-muted mb-1">Reps</label>
                        <input
                          v-model="set.reps"
                          type="number"
                          placeholder="0"
                          class="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      <!-- Weight Input -->
                      <div class="flex-1">
                        <label class="block text-xs text-muted mb-1">Weight</label>
                        <input
                          v-model="set.weight"
                          type="text"
                          placeholder="lbs"
                          class="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      <!-- Completed Checkbox -->
                      <div class="flex items-center pt-5">
                        <UCheckbox
                          v-model="set.completed"
                          color="primary"
                          size="sm"
                        />
                      </div>
                    </div>

                    <!-- Remove Set Button -->
                    <div class="flex items-end pt-5">
                      <UButton
                        v-if="exercise.completedSets.length > 1"
                        icon="i-lucide-trash-2"
                        size="2xs"
                        variant="soft"
                        color="red"
                        @click="confirmDelete(exerciseIndex, setIndex)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Next Exercise Button -->
              <div class="pt-4">
                <UButton
                  :icon="exerciseIndex === exerciseData.length - 1 ? 'i-lucide-check' : 'i-lucide-chevron-right'"
                  color="primary"
                  size="lg"
                  class="w-full"
                  @click="goToExercise(exerciseIndex)"
                >
                  {{ exerciseIndex === exerciseData.length - 1 ? 'End Workout' : 'Next Exercise' }}
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>


    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-red-500" />
            <h3 class="text-lg font-semibold">Confirm Delete</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-muted">
            Are you sure you want to delete this set? This action cannot be undone.
          </p>

          <div class="flex space-x-3 justify-end">
            <UButton
              variant="soft"
              color="gray"
              @click="cancelDelete"
            >
              Cancel
            </UButton>
            <UButton
              color="red"
              @click="removeSet"
            >
              Delete Set
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
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

/* Smooth scrolling behavior */
.custom-scrollbar-hidden {
  scroll-behavior: smooth;
}

/* Input styling */
input, textarea {
  background: rgba(255, 255, 255, 0.9);
}

/* Dark mode input styling */
.dark input, .dark textarea {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.dark input::placeholder, .dark textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
