<script setup lang="ts">
import type { PlayerStatus } from '~/types'

const props = defineProps<{
  status: PlayerStatus
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = computed(() => {
  switch (props.size || 'md') {
    case 'sm':
      return {
        container: 'p-1.5 gap-1.5',
        circle: 'w-3 h-3'
      }
    case 'md':
      return {
        container: 'p-2 gap-2',
        circle: 'w-4 h-4'
      }
    case 'lg':
      return {
        container: 'p-2.5 gap-2.5',
        circle: 'w-5 h-5'
      }
    default:
      return {
        container: 'p-2 gap-2',
        circle: 'w-4 h-4'
      }
  }
})
</script>

<template>
  <div 
    class="inline-flex items-center rounded-2xl border border-primary-500 bg-white dark:bg-gray-900"
    :class="sizeClasses.container"
  >
    <!-- Red Circle -->
    <div 
      class="rounded-full border border-red-500 transition-colors"
      :class="[
        sizeClasses.circle,
        status === 'red' ? 'bg-red-500' : 'bg-transparent'
      ]"
    />
    
    <!-- Yellow Circle -->
    <div 
      class="rounded-full border border-yellow-500 transition-colors"
      :class="[
        sizeClasses.circle,
        status === 'yellow' ? 'bg-yellow-500' : 'bg-transparent'
      ]"
    />
    
    <!-- Green Circle -->
    <div 
      class="rounded-full border border-green-500 transition-colors"
      :class="[
        sizeClasses.circle,
        status === 'green' ? 'bg-green-500' : 'bg-transparent'
      ]"
    />
  </div>
</template>
