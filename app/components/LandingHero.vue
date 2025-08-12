<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  links?: ButtonProps[]
  videoSrc?: string
  overlayColor?: string
  orientation?: 'vertical' | 'horizontal'
}>(), {
  title: 'Green Light',
  description: 'A first-of-its-kind baseball development platform for modern, tech-forward player care: pitch tracking, responsible rest, and assignable training — all in one place.',
  videoSrc: '/video/baseball.mp4',
  overlayColor: '#071000',
  orientation: 'vertical'
})
</script>

<template>
  <section class="relative isolate">
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :src="props.videoSrc"
      autoplay
      muted
      loop
      playsinline
    />

    <div class="absolute inset-0 opacity-80" :style="{ backgroundColor: props.overlayColor }"></div>

    <div class="relative z-10">
      <UPageHero
        :description="props.description"
        :links="props.links"
        :orientation="props.orientation"
      >
        <template #title>
          <img
            src="/greenlight-lightgreen.svg"
            alt="GreenLight"
            class="mx-auto w-[320px] sm:w-[480px] md:w-[640px] lg:w-[720px] h-auto"
          />
        </template>
      </UPageHero>
    </div>
  </section>
</template>


