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

    <UNavigationMenu :items="items" />

    <template #right>
      <NuxtLink to="/coaches">
        <UButton color="primary" variant="solid" class="rounded-full">Get Started</UButton>
      </NuxtLink>
    </template>
  </UHeader>
</template>


