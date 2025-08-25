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
  image?: string
}

const props = defineProps<{
  workout: Workout
  isSelected?: boolean
}>()

const emit = defineEmits<{
  select: [workout: Workout]
  preview: [workout: Workout]
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
</script>

<template>
  <div 
    class="rounded-lg shadow-sm border border-green-400 dark:border-green-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    :class="{ 'ring-2 ring-green-500': isSelected }"
    :style="{ backgroundColor: isSelected ? '#0f3f0f' : '#102710' }"
    @click="emit('select', workout)"
  >
    <!-- Workout Image/Header -->
    <div 
      class="h-48 bg-gradient-to-br from-green-600 to-green-800 rounded-t-lg relative overflow-hidden"
    >
      <!-- Workout Image -->
      <div v-if="workout.image" class="absolute inset-0">
        <img 
          :src="workout.image" 
          :alt="workout.title"
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay for text readability -->
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <!-- Fallback icon when no image -->
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <Icon :name="getCategoryIcon(workout.category)" class="w-16 h-16 text-white opacity-80" />
      </div>
      
      <!-- Category badge -->
      <div class="absolute top-3 left-3 z-10">
        <UBadge :color="getDifficultyColor(workout.difficulty)" variant="soft" size="xs">
          {{ workout.difficulty }}
        </UBadge>
      </div>

      <!-- Action buttons -->
      <div class="absolute top-3 right-3 z-10 flex items-center space-x-2">
        <UCheckbox
          :model-value="isSelected"
          @update:model-value="emit('select', workout)"
          class="flex-shrink-0 bg-black bg-opacity-70 rounded p-1"
          @click.stop
        />
        <UButton
          icon="i-lucide-eye"
          variant="ghost"
          size="xs"
          class="bg-black bg-opacity-70 text-white hover:bg-opacity-90"
          @click.stop="emit('preview', workout)"
        />
      </div>

      <!-- Category icon overlay (bottom right) -->
      <div class="absolute bottom-3 right-3 z-10">
        <div class="bg-black bg-opacity-50 rounded-full p-2">
          <Icon :name="getCategoryIcon(workout.category)" class="w-5 h-5 text-white" />
        </div>
      </div>
    </div>

    <!-- Workout Details -->
    <div class="p-4">
      <div class="mb-2">
        <h3 class="text-lg font-semibold text-white line-clamp-1">
          {{ workout.title }}
        </h3>
        <div class="text-sm text-green-300 mt-1">
          {{ workout.duration }}
        </div>
      </div>

      <p class="text-sm text-green-100 mb-3 line-clamp-2">
        {{ workout.description }}
      </p>

      <!-- Exercise count and target areas -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2 text-sm text-green-200">
          <Icon name="i-lucide-list" class="w-4 h-4" />
          <span>{{ workout.exercises.length }} exercises</span>
        </div>
        <div class="flex items-center space-x-1">
          <UBadge 
            v-for="area in workout.targetAreas.slice(0, 2)" 
            :key="area"
            variant="outline" 
            size="xs"
            class="text-xs"
          >
            {{ area }}
          </UBadge>
          <span v-if="workout.targetAreas.length > 2" class="text-xs text-green-300">
            +{{ workout.targetAreas.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Equipment needed -->
      <div class="flex items-center space-x-2 mb-4">
        <Icon name="i-lucide-wrench" class="w-4 h-4 text-green-300" />
        <span class="text-xs text-green-200">
          {{ workout.equipment.length > 0 ? workout.equipment.join(', ') : 'No equipment needed' }}
        </span>
      </div>
    </div>
  </div>
</template>
