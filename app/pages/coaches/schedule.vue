<script setup lang="ts">
import Calendar from '~/components/coaches/Calendar.vue'
</script>

<template>
  <UDashboardPanel id="coaches-schedule">
    <template #header>
      <UDashboardNavbar title="Schedule">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            label="New Event"
            icon="i-lucide-plus"
            size="md"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Schedule Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center space-x-2">
                <Icon name="i-lucide-calendar-days" class="w-5 h-5 text-green-500" />
                <h3 class="text-lg font-semibold">This Week</h3>
              </div>
            </template>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">8</div>
              <div class="text-sm text-gray-500">Scheduled Events</div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center space-x-2">
                <Icon name="i-lucide-trophy" class="w-5 h-5 text-green-700" />
                <h3 class="text-lg font-semibold">Games</h3>
              </div>
            </template>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-700">3</div>
              <div class="text-sm text-gray-500">This Month</div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center space-x-2">
                <Icon name="i-lucide-users" class="w-5 h-5 text-green-800" />
                <h3 class="text-lg font-semibold">Practice</h3>
              </div>
            </template>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-800">12</div>
              <div class="text-sm text-gray-500">Sessions Planned</div>
            </div>
          </UCard>
        </div>

        <!-- Calendar Component -->
        <Calendar />
      </div>
    </template>
  </UDashboardPanel>
</template>


