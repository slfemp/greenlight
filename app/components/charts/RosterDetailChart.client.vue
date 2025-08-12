<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import { format } from 'date-fns'
import type { PlayerGameStat } from '~/types'

type StatPoint = { date: Date, value: number }

const props = defineProps<{
  points: StatPoint[]
  formatXAxis?: (date: Date) => string
  formatTooltip?: (d: StatPoint) => string
}>()

const chartRef = ref<HTMLElement | null>(null)
const { width } = useElementSize(chartRef)

// Chart accessor functions
const x = (d: StatPoint) => d.date
const y = (d: StatPoint) => d.value

// Use provided formatters or defaults
const xAxisFormat = props.formatXAxis || ((date: Date) => format(date, 'MMM d'))
const tooltipFormat = props.formatTooltip || ((d: StatPoint) => `${format(d.date, 'MMM d, yyyy')}: ${d.value}`)
</script>

<template>
  <div ref="chartRef">
    <VisXYContainer
      :data="props.points"
      :padding="{ top: 10, right: 10, bottom: 40, left: 40 }"
      class="h-96"
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
        :tick-format="xAxisFormat"
        :grid-line="false"
      />
      <VisAxis 
        type="y" 
        :y="y"
        :grid-line="true"
      />
      <VisCrosshair 
        color="var(--ui-primary)" 
        :template="tooltipFormat"
      />
      <VisTooltip />
    </VisXYContainer>
  </div>
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