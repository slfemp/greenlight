<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Team } from '~/types'

const route = useRoute()
const toast = useToast()

const open = ref(false)

// Fetch teams data first
const { data: teams } = await useFetch<Team[]>('/api/teams', { default: () => [] })

// Navigation items with teams dropdown
const staticItems = computed(() => [{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/coaches',
  onSelect: () => { open.value = false }
}, {
  label: 'Roster',
  icon: 'i-lucide-users',
  to: '/coaches/roster',
  onSelect: () => { open.value = false }
}, {
  label: 'Schedule',
  icon: 'i-lucide-calendar-clock',
  to: '/coaches/schedule',
  onSelect: () => { open.value = false }
}, {
  label: 'Training',
  icon: 'i-lucide-dumbbell',
  to: '/coaches/training',
  onSelect: () => { open.value = false }
}, {
  label: 'Teams',
  icon: 'i-lucide-shield',
  to: '/coaches/teams',
  onSelect: () => { open.value = false }
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger' as const,
  children: [{
    label: 'General',
    to: '/settings',
    exact: true,
    onSelect: () => { open.value = false }
  }]
}])

// Empty team items array since teams are now in the dropdown
const teamItems = computed<NavigationMenuItem[]>(() => [])

const links = computed<NavigationMenuItem[][]>(() => [staticItems.value, teamItems.value])

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.value.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-pro/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <SidebarHeader :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <!-- Teams dropdown/navigation -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          popover
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    
  </UDashboardGroup>
</template>
