<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const tabs = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/'
}, {
  label: 'Players',
  icon: 'i-lucide-users',
  to: '/coaches/roster'
}, {
  label: 'Settings',
  icon: 'i-lucide-settings',
  to: '/settings'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <div class="min-h-screen flex justify-center bg-black">
    <div class="w-full max-w-[420px] min-h-screen flex flex-col bg-(--ui-bg)">
      <UDashboardNavbar title="App" :ui="{ right: 'gap-2' }" />

      <div class="flex-1">
        <slot />
      </div>

      <div class="sticky bottom-0 inset-x-0 border-t border-(--ui-border) bg-elevated/50 backdrop-blur">
        <UNavigationMenu :items="tabs" orientation="horizontal" class="justify-between" />
      </div>
      
    </div>
  </div>
 </template>


