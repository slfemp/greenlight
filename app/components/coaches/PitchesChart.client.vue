<script setup lang="ts">
import { eachWeekOfInterval, format, subWeeks } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

type DataRecord = {
  date: Date
  pitches: number
}

const { width } = useElementSize(cardRef)

// Generate fake data for the last 8 weeks
const data = ref<DataRecord[]>([])

const range = {
  start: subWeeks(new Date(), 7),
  end: new Date()
}

const dates = eachWeekOfInterval(range)

// Generate fake pitch data (50-150 pitches per week)
const min = 50
const max = 150

data.value = dates.map(date => ({ 
  date, 
  pitches: Math.floor(Math.random() * (max - min + 1)) + min 
}))

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.pitches

const total = computed(() => data.value.reduce((acc: number, { pitches }) => acc + pitches, 0))
const average = computed(() => Math.round(total.value / data.value.length))

const formatDate = (date: Date): string => {
  return format(date, 'd MMM')
}

const xTicks = (i: number) => {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }
  return formatDate(data.value[i].date)
}

const template = (d: DataRecord) => `${formatDate(d.date)}: ${d.pitches} pitches`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Pitches Per Week
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ average }}
        </p>
        <p class="text-xs text-muted">
          Average this period
        </p>
      </div>
    </template>

    <VisXYContainer
      :data="data"
      :padding="{ top: 40 }"
      class="h-64"
      :width="width"
    >
      <VisLine
        :x="x"
        :y="y"
        color="var(--ui-primary)"
      />
      <VisArea
        :x="x"
        :y="y"
        color="var(--ui-primary)"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <VisCrosshair
        color="var(--ui-primary)"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>


