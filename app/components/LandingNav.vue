<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => ([
  {
    label: 'Coaches',
    to: '/coaches',
    active: route.path.startsWith('/coaches')
  },
  {
    label: 'Players',
    to: '/players',
    active: route.path.startsWith('/players')
  }
]))
</script>

<template>
  <UHeader :title="''">
    <template #left>
      <NuxtLink to="/">
        <img src="/greenlight-text-one-color.svg" alt="GreenLight" class="h-6 w-auto" />
      </NuxtLink>
    </template>

    <!-- Navigation items displayed inline -->
    <div class="hidden md:flex items-center space-x-6">
      <NuxtLink 
        v-for="item in items" 
        :key="item.to"
        :to="item.to"
        class="text-sm font-medium hover:text-primary transition-colors"
        :class="{ 'text-primary': item.active }"
      >
        {{ item.label }}
      </NuxtLink>
    </div>

    <template #right>
      <div class="flex items-center space-x-2">
        <NuxtLink to="/coaches">
          <UButton color="primary" variant="outline" size="sm" class="rounded-full">Coaches</UButton>
        </NuxtLink>
        <NuxtLink to="/players">
          <UButton color="primary" variant="solid" size="sm" class="rounded-full">Players</UButton>
        </NuxtLink>
      </div>
    </template>
  </UHeader>
</template>


