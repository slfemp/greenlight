<script setup lang="ts">
definePageMeta({ layout: 'mobile' })
const route = useRoute()
const workoutId = computed(() => route.params.id)
</script>

<template>
  <div class="p-3 space-y-4">
    <UPageCard title="Workout Detail" :description="workoutId ? `ID: ${workoutId}` : 'Details for a specific workout'" variant="subtle" />

    <UPageCard variant="subtle">
      <div class="text-dimmed">Detailed workout steps will appear here.</div>
    </UPageCard>
  </div>
</template>


