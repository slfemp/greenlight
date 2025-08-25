<script setup lang="ts">
// Current status with three circles
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Current Status
        </p>
        <p class="text-3xl text-highlighted font-semibold text-green-500">
          Active
        </p>
      </div>
    </template>

    <div class="flex items-center justify-center space-x-4 py-8">
      <!-- Red outline circle -->
      <div class="w-12 h-12 rounded-full border-2 border-red-500 bg-transparent"></div>
      
      <!-- Yellow outline circle -->
      <div class="w-12 h-12 rounded-full border-2 border-yellow-500 bg-transparent"></div>
      
      <!-- Solid green circle -->
      <div class="w-12 h-12 rounded-full bg-green-500"></div>
    </div>

    <div class="text-center text-sm text-muted">
      System operational
    </div>
  </UCard>
</template>

