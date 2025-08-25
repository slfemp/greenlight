<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const router = useRouter()

// Get program ID from query params
const programId = computed(() => route.query.program as string)

// Mock program data
const currentProgram = computed(() => ({
  id: 1,
  title: 'Morning Strength Routine',
  exercises: [
    { name: 'Push-ups' },
    { name: 'Squats' },
    { name: 'Planks' },
    { name: 'Pull-ups' }
  ]
}))

// Generate simple workout history data
const workoutHistory = computed(() => {
  const exercises = currentProgram.value.exercises
  return exercises.map((exercise, index) => {
    const baseWeight = 100 + (index * 20)
    const progressionData = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayProgress = (29 - i) / 29
      const variation = Math.sin(i * 0.3) * 2

      progressionData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: Math.round(baseWeight + (dayProgress * 30) + variation),
        day: i
      })
    }
    return { name: exercise.name, progressionData }
  })
})

// Chart data functions
const x = (_: any, i: number) => i
const y = (d: any) => d.weight
const template = (d: any) => `${d.date}: ${d.weight}lbs`
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
          class="text-green-800 hover:text-green-900"
          @click="router.push('/players/training-calendar')"
        />
        <div class="text-center">
          <h1 class="text-lg font-semibold text-green-800">Workout Complete!</h1>
          <p class="text-sm text-green-600">{{ currentProgram.title }}</p>
        </div>
        <UButton
          icon="i-lucide-home"
          variant="ghost"
          size="xl"
          class="text-green-800 hover:text-green-900"
          @click="router.push('/players')"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-4 space-y-6" style="background-color: #071107; padding-bottom: 400px;">
      <!-- Workout Summary -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <template #header>
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-line-chart" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">30-Day Progress</h3>
          </div>
        </template>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-muted">Program</p>
              <p class="font-medium text-highlighted">{{ currentProgram.title }}</p>
            </div>
            <div>
              <p class="text-muted">Exercises</p>
              <p class="font-medium text-highlighted">{{ currentProgram.exercises.length }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Exercise Progress Charts -->
      <div class="space-y-4">
        <UCard
          v-for="exercise in workoutHistory"
          :key="exercise.name"
          class="hover:shadow-lg transition-shadow duration-200"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <UIcon name="i-lucide-dumbbell" class="w-5 h-5" />
                <h4 class="font-semibold">{{ exercise.name }}</h4>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <!-- Unovis Chart -->
            <div class="h-48">
              <VisXYContainer
                :data="exercise.progressionData"
                :padding="{ top: 20, bottom: 20, left: 40, right: 20 }"
                class="h-full w-full"
              >
                <VisLine
                  :x="x"
                  :y="y"
                  color="var(--ui-primary)"
                />
                <VisAxis
                  type="x"
                  :tick-format="(i) => exercise.progressionData[i]?.date || ''"
                />
                <VisAxis type="y" />
                <VisCrosshair
                  color="var(--ui-primary)"
                  :template="template"
                />
                <VisTooltip />
              </VisXYContainer>
            </div>

            <!-- Data Table -->
            <div class="mt-4">
              <h5 class="font-medium mb-2">Recent Sessions</h5>
              <div class="grid grid-cols-4 gap-2 text-sm">
                <div class="font-medium text-muted">Date</div>
                <div class="font-medium text-muted">Weight</div>
                <div class="font-medium text-muted">Reps</div>
                <div class="font-medium text-muted">Sets</div>
                
                <template v-for="entry in exercise.progressionData.slice(-5)" :key="entry.date">
                  <div>{{ entry.date }}</div>
                  <div>{{ entry.weight }}lbs</div>
                  <div>12</div>
                  <div>3</div>
                </template>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);
  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);
  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>