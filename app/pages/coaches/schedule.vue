<script setup lang="ts">
</script>

<template>
  <UDashboardPanel id="coaches-schedule">
    <template #header>
      <UDashboardNavbar title="Schedule">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageCard title="Team Schedule" description="Plan and review upcoming sessions." variant="subtle" />
    </template>
  </UDashboardPanel>
</template>


