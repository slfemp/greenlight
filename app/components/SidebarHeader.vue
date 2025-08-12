<script setup lang="ts">
defineProps<{ collapsed?: boolean }>()
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2 p-2">
    <img src="/greenlight-lightgreen.svg" alt="GreenLight" class="h-12" />
  </NuxtLink>
</template>
