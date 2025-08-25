<script setup lang="ts">
import type { Player, Team } from '~/types'

const props = defineProps<{
  player: Player
  team?: Team
}>()

// Use consistent color scheme for all cards
const colors = {
  primary: '#1a3d1a',    // Lighter dark green background
  secondary: '#FFFEEB',  // Light cream/white for text
  accent: '#0f2d0f'      // Darker green for accents
}

const statusColor = computed(() => {
  switch (props.player.status) {
    case 'green': return '#16a34a'
    case 'yellow': return '#eab308'
    case 'red': return '#dc2626'
    default: return '#6b7280'
  }
})

// Calculate age from birth date
const age = computed(() => {
  if (!props.player.birthDate) return 'N/A'
  const birth = new Date(props.player.birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
})

// Get recent stats
const recentStats = computed(() => {
  if (!props.player.stats || props.player.stats.length === 0) return null
  const recent = props.player.stats[props.player.stats.length - 1]
  return recent
})
</script>

<template>
  <UCard 
    class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    @click="$router.push(`/coaches/rosterdetails?id=${player.id}`)"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <UAvatar 
            :src="player.avatar?.src" 
            :alt="player.name"
            size="lg"
          />
          <div>
            <h3 class="font-semibold text-lg">{{ player.name }}</h3>
            <p class="text-sm text-muted">{{ player.position }} • #{{ player.jerseyNumber }}</p>
          </div>
        </div>
        
        <UDropdownMenu 
          :items="[
            [{
              label: 'View Details',
              icon: 'i-lucide-eye',
              click: () => $router.push(`/coaches/rosterdetails?id=${player.id}`)
            }],
            [{
              label: 'Edit Player',
              icon: 'i-lucide-edit',
              click: () => $router.push(`/coaches/players/${player.id}/edit`)
            }, {
              label: 'Delete Player',
              icon: 'i-lucide-trash',
              color: 'error'
            }]
          ]"
        >
          <UButton 
            icon="i-lucide-more-vertical" 
            variant="ghost" 
            color="gray"
            size="sm"
            @click.stop
          />
        </UDropdownMenu>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Player Info -->
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-muted">Team</p>
          <p class="font-medium">{{ team?.name || 'No Team' }}</p>
        </div>
        <div>
          <p class="text-muted">Age</p>
          <p class="font-medium">{{ age }}</p>
        </div>
        <div class="col-span-2">
          <div class="mt-1 flex justify-center">
            <StatusIndicator :status="player.status" size="sm" />
          </div>
        </div>
      </div>

      <!-- Player Stats -->
      <div class="border-t pt-4">
        <div v-if="recentStats" class="grid grid-cols-2 gap-2 text-center">
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ recentStats.pitchCount }}</p>
            <p class="text-xs text-muted">Last Pitches</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ recentStats.inningsPitched }}</p>
            <p class="text-xs text-muted">Innings</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ recentStats.pitchesPerInning }}</p>
            <p class="text-xs text-muted">Per Inning</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ recentStats.restDays }}</p>
            <p class="text-xs text-muted">Rest Days</p>
          </div>
        </div>
        <div v-else class="text-center text-muted text-sm">
          No recent stats available
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2 pt-2">
        <UButton 
          size="sm" 
          color="primary" 
          variant="soft" 
          icon="i-lucide-eye"
          class="flex-1"
          @click.stop="$router.push(`/coaches/rosterdetails?id=${player.id}`)"
        >
          View Details
        </UButton>
        <UButton 
          size="sm" 
          color="gray" 
          variant="soft" 
          icon="i-lucide-edit"
          @click.stop="$router.push(`/coaches/players/${player.id}/edit`)"
        >
          Edit
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.ring-2 {
  ring-width: 2px;
  ring-color: var(--ring-color);
}
</style>
