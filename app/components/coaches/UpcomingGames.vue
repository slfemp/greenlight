<script setup lang="ts">
import { addDays, format } from 'date-fns'

// Upcoming games data
const games = [
  {
    date: addDays(new Date(), 2),
    opponent: 'Eagles',
    location: 'Home',
    time: '7:00 PM'
  },
  {
    date: addDays(new Date(), 5),
    opponent: 'Lions',
    location: 'Away',
    time: '6:30 PM'
  },
  {
    date: addDays(new Date(), 9),
    opponent: 'Tigers',
    location: 'Home',
    time: '7:30 PM'
  },
  {
    date: addDays(new Date(), 12),
    opponent: 'Bears',
    location: 'Away',
    time: '6:00 PM'
  },
  {
    date: addDays(new Date(), 16),
    opponent: 'Hawks',
    location: 'Home',
    time: '7:00 PM'
  }
]

const formatGameDate = (date: Date) => {
  return format(date, 'MMM d')
}

const formatGameDay = (date: Date) => {
  return format(date, 'EEE')
}
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Upcoming Games
        </p>
        <p class="text-lg font-semibold">
          Next 5 Games
        </p>
      </div>
    </template>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-2 text-muted uppercase text-xs font-medium">Date</th>
            <th class="text-left py-2 text-muted uppercase text-xs font-medium">Opponent</th>
            <th class="text-left py-2 text-muted uppercase text-xs font-medium">Location</th>
            <th class="text-left py-2 text-muted uppercase text-xs font-medium">Time</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="game in games" :key="game.opponent" class="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td class="py-3">
              <div>
                <div class="font-medium">{{ formatGameDate(game.date) }}</div>
                <div class="text-xs text-muted">{{ formatGameDay(game.date) }}</div>
              </div>
            </td>
            <td class="py-3 font-medium">{{ game.opponent }}</td>
            <td class="py-3">
              <UBadge 
                :color="game.location === 'Home' ? 'green' : 'blue'" 
                variant="soft" 
                size="xs"
              >
                {{ game.location }}
              </UBadge>
            </td>
            <td class="py-3 text-muted">{{ game.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>

