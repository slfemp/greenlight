<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'
import PitchesChart from '~/components/coaches/PitchesChart.client.vue'
import CurrentStatus from '~/components/coaches/CurrentStatus.vue'
import TodaysPlan from '~/components/coaches/TodaysPlan.vue'
import UpcomingGames from '~/components/coaches/UpcomingGames.vue'

const items = [[{
  label: 'New player',
  icon: 'i-lucide-user-plus',
  to: '/coaches/roster'
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <!-- Row 1 -->
        <PitchesChart />
        <CurrentStatus />
        
        <!-- Row 2 -->
        <TodaysPlan />
        <UpcomingGames />
      </div>
    </template>
  </UDashboardPanel>
</template>
