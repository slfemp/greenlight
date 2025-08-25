<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const router = useRouter()

// Close menu when route changes
watch(() => route.path, () => {
  open.value = false
})

// Navigation function - only close on route change, not on click
function navigateTo(path: string) {
  console.log('Navigating to:', path)
  try {
    router.push(path)
    console.log('Router push successful')
  } catch (error) {
    console.error('Router push error:', error)
  }
}
</script>

<template>
  <div>
    <!-- Header Navigation -->
    <div class="sticky top-0 z-50 border-b border-(--ui-border) px-4 py-3" style="background-color: #051406 !important; opacity: 1 !important;">
      <div class="relative flex items-center justify-between h-12">
        <!-- Left: Hamburger Menu -->
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" @click="open = !open" />
        
        <!-- Center: Logo -->
        <NuxtLink to="/players" aria-label="Home" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img src="/icon.svg" alt="Greenlight" class="h-16" />
        </NuxtLink>
        
        <!-- Right: Profile Button -->
        <NuxtLink to="/players/profile">
          <UButton icon="i-lucide-user" color="neutral" variant="ghost" />
        </NuxtLink>
      </div>
    </div>

    <!-- Expandable Navigation Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="open" 
        class="border-b border-(--ui-border) shadow-lg sticky top-[73px] z-40"
        style="background-color: #051406 !important;"
      >
      <div class="px-4 py-2 space-y-1">
        <!-- Main Navigation -->
        <a
          href="/players"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players')"
        >
          <UIcon name="i-lucide-house" class="w-5 h-5" />
          <span class="font-medium">Home</span>
        </a>
        
        <a
          href="/players/training-calendar"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/training-calendar')"
        >
          <UIcon name="i-lucide-calendar-clock" class="w-5 h-5" />
          <span class="font-medium">Training Calendar</span>
        </a>
        
        <a
          href="/players/training-calendar?tab=programs"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/training-calendar?tab=programs')"
        >
          <UIcon name="i-lucide-book-open" class="w-5 h-5" />
          <span class="font-medium">Workouts</span>
        </a>
        
        <a
          href="/players/workout-review?program=1"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/workout-review?program=1')"
        >
          <UIcon name="i-lucide-dumbbell" class="w-5 h-5" />
          <span class="font-medium">Workout Overview</span>
        </a>
        
        <a
          href="/players/workout-detail"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/workout-detail')"
        >
          <UIcon name="i-lucide-clipboard-list" class="w-5 h-5" />
          <span class="font-medium">Workout Detail</span>
        </a>
        
        <!-- Separator -->
        <div class="h-px bg-green-700/50 my-2"></div>
        
        <!-- Profile Section -->
        <a
          href="/players/profile"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/profile')"
        >
          <UIcon name="i-lucide-user" class="w-5 h-5" />
          <span class="font-medium">Profile</span>
        </a>
        
        <a
          href="/players/settings"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          @click.prevent="navigateTo('/players/settings')"
        >
          <UIcon name="i-lucide-settings" class="w-5 h-5" />
          <span class="font-medium">Settings</span>
        </a>
      </div>
      </div>
    </Transition>
  </div>
</template>
