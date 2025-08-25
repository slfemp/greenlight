<script setup lang="ts">
import PlayerHeader from '../components/players/PlayerHeader.vue'

// Bottom app-style footer tabs (5 evenly spaced buttons)
const tabs = [[
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/players'
  },
  {
    label: 'Training',
    icon: 'i-lucide-calendar-clock',
    to: '/players/training-calendar'
  },
  {
    label: 'Programs',
    icon: 'i-lucide-book-open',
    to: '/players/program-library'
  },
  {
    label: 'Workouts',
    icon: 'i-lucide-dumbbell',
    to: '/players/workout-overview'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/players/settings'
  }
]]
</script>

<template>
  <div class="min-h-screen flex justify-center bg-black">
    <div class="w-full max-w-[420px] min-h-screen flex flex-col" style="background-color: #b4d8b6;">
      <PlayerHeader />

      <div class="flex-1 relative z-20">
        <slot />
      </div>

      <div class="fixed bottom-0 inset-x-0 border-t border-(--ui-border) z-50 max-w-[420px] mx-auto" style="background-color: #081308;">
        <div class="flex justify-around items-center py-2 px-4">
          <NuxtLink
            v-for="tab in tabs[0]"
            :key="tab.to"
            :to="tab.to"
            class="flex flex-col items-center justify-center p-3 rounded-lg transition-colors"
            active-class="text-primary-500"
            exact-active-class="text-primary-500"
          >
            <UIcon :name="tab.icon" class="w-6 h-6" />
          </NuxtLink>
        </div>
      </div>
      
    </div>
  </div>
 </template>


