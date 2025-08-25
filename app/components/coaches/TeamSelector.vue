<script setup lang="ts">
import type { Team } from '~/types'

const props = defineProps<{
  teams: Team[]
  selectedTeamId?: string
}>()

const emit = defineEmits<{
  selectTeam: [teamId: string | undefined]
}>()

function selectTeam(teamId: string | undefined) {
  emit('selectTeam', teamId)
}

// Generate team icon based on team name/abbreviation
function getTeamIcon(team: Team) {
  const name = team.name.toLowerCase()
  if (name.includes('legend')) return 'i-lucide-star'
  if (name.includes('raptor')) return 'i-lucide-zap'
  if (name.includes('crusher')) return 'i-lucide-waves'
  if (name.includes('miner')) return 'i-lucide-mountain'
  if (name.includes('desert') || name.includes('diamond')) return 'i-lucide-gem'
  if (name.includes('captain')) return 'i-lucide-anchor'
  if (name.includes('hawk')) return 'i-lucide-bird'
  if (name.includes('pioneer')) return 'i-lucide-compass'
  if (name.includes('slugger') || name.includes('steel')) return 'i-lucide-hammer'
  if (name.includes('barnstorm') || name.includes('bay')) return 'i-lucide-sailboat'
  return 'i-lucide-circle'
}
</script>

<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Team</h3>
    
    <!-- Horizontal scrolling container -->
    <div class="flex space-x-4 overflow-x-auto pb-4 pt-2 pl-2 pr-2 scrollbar-hide">
      <!-- All Teams option -->
      <UCard
        class="flex-shrink-0 w-24 hover:shadow-lg transition-all duration-200 cursor-pointer mt-1"
        :class="!selectedTeamId ? 'ring-2 ring-primary-500' : ''"
        @click="selectTeam(undefined)"
      >
        <div class="flex flex-col items-center p-2">
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center text-white"
            :class="!selectedTeamId ? 'bg-primary-500' : 'bg-gray-400'"
          >
            <UIcon name="i-lucide-users" class="w-6 h-6" />
          </div>
          <span 
            class="text-xs font-medium mt-2 text-center"
            :class="!selectedTeamId ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'"
          >
            All Teams
          </span>
        </div>
      </UCard>

      <!-- Individual teams -->
      <UCard
        v-for="team in teams" 
        :key="team.id"
        class="flex-shrink-0 w-24 hover:shadow-lg transition-all duration-200 cursor-pointer mt-1"
        :class="selectedTeamId === team.id ? 'ring-2' : ''"
        :style="selectedTeamId === team.id ? { '--tw-ring-color': team.primaryColor } : {}"
        @click="selectTeam(team.id)"
      >
        <div class="flex flex-col items-center p-2">
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center text-white"
            :style="{ backgroundColor: selectedTeamId === team.id ? team.primaryColor : '#6B7280' }"
          >
            <UIcon :name="getTeamIcon(team)" class="w-6 h-6" />
          </div>
          <span 
            class="text-xs font-medium mt-2 text-center leading-tight"
            :class="selectedTeamId === team.id ? 'font-bold' : 'text-gray-600 dark:text-gray-400'"
            :style="selectedTeamId === team.id ? { color: team.primaryColor } : {}"
          >
            {{ team.name.split(' ').slice(0, -1).join(' ') }}
          </span>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for webkit browsers */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>