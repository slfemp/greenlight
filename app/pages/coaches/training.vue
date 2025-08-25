<script setup lang="ts">
import WorkoutCard from '~/components/coaches/WorkoutCard.vue'
import WorkoutPreview from '~/components/coaches/WorkoutPreview.vue'
import SelectedWorkoutsSidebar from '~/components/coaches/SelectedWorkoutsSidebar.vue'

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
  image?: string
}

// Sample workout data
const workouts: Workout[] = [
  {
    id: '1',
    title: 'Power Hitting Fundamentals',
    category: 'Batting',
    difficulty: 'Beginner',
    duration: '45 min',
    description: 'Build proper batting stance, grip, and swing mechanics for consistent contact and power.',
    targetAreas: ['Core', 'Arms', 'Coordination'],
    equipment: ['Bat', 'Tee', 'Baseballs'],
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Tee Work - Basic Stance', sets: 3, reps: 15, rest: '1 min' },
      { name: 'Soft Toss Drills', sets: 4, reps: 10, rest: '90 sec' },
      { name: 'Dry Swings', sets: 5, reps: 20, rest: '30 sec' },
      { name: 'Medicine Ball Rotations', sets: 3, reps: 12, rest: '45 sec' }
    ]
  },
  {
    id: '2',
    title: 'Pitching Velocity Builder',
    category: 'Throwing',
    difficulty: 'Intermediate',
    duration: '60 min',
    description: 'Increase throwing velocity through proper mechanics and strength training.',
    targetAreas: ['Shoulders', 'Core', 'Legs'],
    equipment: ['Baseballs', 'Resistance Bands', 'Medicine Ball'],
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Dynamic Warm-up', sets: 1, duration: '10 min', rest: 'None' },
      { name: 'Long Toss', sets: 3, reps: 20, rest: '2 min' },
      { name: 'Band Pull-Aparts', sets: 4, reps: 15, rest: '30 sec' },
      { name: 'Weighted Ball Throws', sets: 3, reps: 8, rest: '90 sec' },
      { name: 'Bullpen Session', sets: 1, duration: '15 min', rest: 'None' }
    ]
  },
  {
    id: '3',
    title: 'Speed & Agility Training',
    category: 'Agility',
    difficulty: 'Intermediate',
    duration: '35 min',
    description: 'Improve base running speed, first step quickness, and overall agility.',
    targetAreas: ['Legs', 'Core', 'Conditioning'],
    equipment: ['Cones', 'Ladder', 'Stopwatch'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Ladder Drills', sets: 4, duration: '30 sec', rest: '30 sec' },
      { name: 'Cone Shuffle', sets: 3, reps: 5, rest: '45 sec' },
      { name: '60-Yard Sprints', sets: 5, reps: 1, rest: '2 min' },
      { name: 'Base Running Form', sets: 3, reps: 3, rest: '90 sec' }
    ]
  },
  {
    id: '4',
    title: 'Core Strength Foundation',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '30 min',
    description: 'Build essential core strength for better power transfer and injury prevention.',
    targetAreas: ['Core', 'Stability', 'Balance'],
    equipment: ['Mat', 'Medicine Ball'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80',
    exercises: [
      { name: 'Plank Hold', sets: 3, duration: '45 sec', rest: '30 sec' },
      { name: 'Russian Twists', sets: 3, reps: 20, rest: '30 sec' },
      { name: 'Dead Bugs', sets: 3, reps: 10, rest: '30 sec' },
      { name: 'Medicine Ball Slams', sets: 4, reps: 12, rest: '45 sec' }
    ]
  },
  {
    id: '5',
    title: 'Elite Conditioning Circuit',
    category: 'Cardio',
    difficulty: 'Advanced',
    duration: '50 min',
    description: 'High-intensity conditioning for game-ready endurance and mental toughness.',
    targetAreas: ['Cardiovascular', 'Full Body', 'Mental Toughness'],
    equipment: ['Kettlebells', 'Jump Rope', 'Cones'],
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop&q=80',
    exercises: [
      { name: 'Kettlebell Swings', sets: 4, reps: 20, rest: '30 sec' },
      { name: 'Burpees', sets: 3, reps: 10, rest: '45 sec' },
      { name: 'Jump Rope', sets: 5, duration: '1 min', rest: '30 sec' },
      { name: 'Mountain Climbers', sets: 4, duration: '30 sec', rest: '30 sec' },
      { name: 'Sprint Intervals', sets: 6, duration: '30 sec', rest: '90 sec' }
    ]
  },
  {
    id: '6',
    title: 'Flexibility & Recovery',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: '25 min',
    description: 'Essential stretching and recovery routine for injury prevention and mobility.',
    targetAreas: ['Flexibility', 'Recovery', 'Mobility'],
    equipment: ['Mat', 'Foam Roller'],
    image: 'https://images.unsplash.com/photo-1506629905607-d13d875eb5ca?w=400&h=300&fit=crop&q=80',
    exercises: [
      { name: 'Dynamic Leg Swings', sets: 2, reps: 15, rest: '30 sec' },
      { name: 'Shoulder Circles', sets: 2, reps: 10, rest: '15 sec' },
      { name: 'Hip Flexor Stretch', sets: 2, duration: '30 sec', rest: '15 sec' },
      { name: 'Foam Rolling', sets: 1, duration: '10 min', rest: 'None' }
    ]
  }
]

// State management
const selectedCategory = ref('All')
const selectedDifficulty = ref('All')
const searchQuery = ref('')
const selectedWorkouts = ref<Set<string>>(new Set())
const previewWorkout = ref<Workout | null>(null)
const showPreview = ref(false)

// Filter options
const categories = ['All', 'Batting', 'Throwing', 'Agility', 'Strength', 'Cardio', 'Flexibility']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

// Computed filtered workouts
const filteredWorkouts = computed(() => {
  return workouts.filter(workout => {
    const matchesCategory = selectedCategory.value === 'All' || workout.category === selectedCategory.value
    const matchesDifficulty = selectedDifficulty.value === 'All' || workout.difficulty === selectedDifficulty.value
    const matchesSearch = searchQuery.value === '' || 
      workout.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })
})

// Functions
function selectWorkout(workout: Workout) {
  if (selectedWorkouts.value.has(workout.id)) {
    selectedWorkouts.value.delete(workout.id)
  } else {
    selectedWorkouts.value.add(workout.id)
  }
}

function previewWorkoutDetail(workout: Workout) {
  previewWorkout.value = workout
  showPreview.value = true
}

function addToRoutine(workout: Workout) {
  selectedWorkouts.value.add(workout.id)
  showPreview.value = false
}

function clearSelection() {
  selectedWorkouts.value.clear()
}

// Computed selected workouts array
const selectedWorkoutsArray = computed(() => {
  return workouts.filter(workout => selectedWorkouts.value.has(workout.id))
})

function removeWorkout(workoutId: string) {
  selectedWorkouts.value.delete(workoutId)
}

function createRoutine() {
  // Future implementation for saving routine
  console.log('Creating routine with:', Array.from(selectedWorkouts.value))
  // For now, just show success message
  alert(`Routine saved with ${selectedWorkouts.value.size} workouts!`)
}
</script>

<template>
  <UDashboardPanel id="coaches-training">
    <template #header>
      <UDashboardNavbar title="Training Library">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge 
            v-if="selectedWorkouts.size > 0" 
            :label="`${selectedWorkouts.size} selected`"
            color="green" 
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex h-full">
        <!-- Selected Workouts Sidebar -->
        <SelectedWorkoutsSidebar
          :selected-workouts="selectedWorkoutsArray"
          @remove-workout="removeWorkout"
          @clear-all="clearSelection"
          @save-routine="createRoutine"
        />

        <!-- Main Content -->
        <div class="flex-1 p-6 space-y-6 overflow-y-auto">
          <!-- Stats Overview -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <UCard>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ workouts.length }}</div>
                <div class="text-sm text-gray-500">Total Workouts</div>
              </div>
            </UCard>
            <UCard>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ categories.length - 1 }}</div>
                <div class="text-sm text-gray-500">Categories</div>
              </div>
            </UCard>
            <UCard>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ selectedWorkouts.size }}</div>
                <div class="text-sm text-gray-500">Selected</div>
              </div>
            </UCard>
            <UCard>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ filteredWorkouts.length }}</div>
                <div class="text-sm text-gray-500">Showing</div>
              </div>
            </UCard>
          </div>

        <!-- Filters -->
        <UCard>
          <div class="space-y-4">
            <!-- Search and filters -->
            <div class="flex flex-wrap gap-4">
              <div class="flex-1 min-w-64">
                <UInput
                  v-model="searchQuery"
                  placeholder="Search workouts..."
                  icon="i-lucide-search"
                />
              </div>
              <USelect
                v-model="selectedCategory"
                :items="categories"
                placeholder="Category"
                class="min-w-32"
              />
              <USelect
                v-model="selectedDifficulty"
                :items="difficulties"
                placeholder="Difficulty"
                class="min-w-32"
              />
              <UButton
                v-if="selectedWorkouts.size > 0"
                label="Clear Selection"
                variant="outline"
                icon="i-lucide-x"
                @click="clearSelection"
              />
            </div>

            <!-- Selection status -->
            <div v-if="selectedWorkouts.size > 0" class="flex justify-end">
              <div class="text-sm text-green-600 font-medium">
                {{ selectedWorkouts.size }} workouts selected for routine
              </div>
            </div>
          </div>
        </UCard>

        <!-- Workout Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkoutCard
            v-for="workout in filteredWorkouts"
            :key="workout.id"
            :workout="workout"
            :is-selected="selectedWorkouts.has(workout.id)"
            @select="selectWorkout"
            @preview="previewWorkoutDetail"
          />
        </div>

        <!-- Empty state -->
        <div v-if="filteredWorkouts.length === 0" class="text-center py-12">
          <Icon name="i-lucide-search-x" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No workouts found</h3>
          <p class="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        </div>
      </div>

      <!-- Workout Preview Slideover -->
      <WorkoutPreview
        :is-open="showPreview"
        :workout="previewWorkout"
        @update:is-open="(value: boolean) => showPreview = value"
        @close="showPreview = false"
        @add-to-routine="addToRoutine"
      />
    </template>
  </UDashboardPanel>
</template>


