<script setup lang="ts">
definePageMeta({ layout: false })

const links = ref([
  {
    label: 'Coaches Dashboard',
    to: '/coaches',
    icon: 'i-lucide-users'
  },
  {
    label: 'Players App',
    to: '/players',
    icon: 'i-lucide-user'
  }
])
</script>

<template>
  <LandingNav />

  <LandingHero :links="links" />

<!-- Marketing content -->
<section class="relative py-16 sm:py-24">
  <div class="mx-auto max-w-5xl px-4 space-y-12">
    <UPageCard title="Why Green Light" variant="naked">
      <p class="text-muted leading-relaxed">
        Green Light is a first of its kind baseball development platform designed to give a modern and tech-forward
        experience to the youth baseball industry. Green Light helps coaches and players track pitch counts across organizations,
        responsibly prescribe rest and recovery, and assign training and arm care programs—all in one place. We service organizations
        and teams through intuitive tracking, resourcing, and insights.
      </p>
    </UPageCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UPageCard title="Mission" variant="subtle">
        <p class="text-muted">We exist to address and eliminate the overuse epidemic in youth baseball through the eradication of that injury class.</p>
      </UPageCard>
      <UPageCard title="Vision" variant="subtle">
        <p class="text-muted">To promote healthy, long-term baseball development in order to maximize youth participation of this great game.</p>
      </UPageCard>
    </div>

    <UPageCard title="Features" variant="subtle">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h3 class="font-semibold text-highlighted mb-1">Smart Pitch Tracking</h3>
          <p class="text-muted">Automatic pitch count tracking and rest day forecasts, aligned with Pitch Smart guidelines.</p>
        </div>
        <div>
          <h3 class="font-semibold text-highlighted mb-1">Arm Care + Strength Programs</h3>
          <p class="text-muted">Pre-built and customizable training plans delivered directly to players’ phones with an in-house workout app.</p>
        </div>
        <div>
          <h3 class="font-semibold text-highlighted mb-1">Green Light Status System</h3>
          <p class="text-muted">Color-coded bullpen availability provides live feedback—who’s cleared to throw and who’s at risk.</p>
        </div>
        <div>
          <h3 class="font-semibold text-highlighted mb-1">Team Resource Tools</h3>
          <p class="text-muted">Easily schedule bullpens and workouts, provide compliance data to leagues, and more.</p>
        </div>
        <div>
          <h3 class="font-semibold text-highlighted mb-1">Organizational Insights</h3>
          <p class="text-muted">Admin-level dashboards show usage, compliance, and injury risk trends across the organization.</p>
        </div>
      </div>
    </UPageCard>

    <UPageCard title="Core Functionality" variant="naked">
      <ol class="list-decimal ms-6 space-y-4 text-muted">
        <li>
          <span class="font-medium text-highlighted">Coach / Personal Oversight</span> — Multi-layered access (coach, players, parents). Monitor players’ workloads across multiple teams. Seamless schedule uploads and roster management.
        </li>
        <li>
          <span class="font-medium text-highlighted">Pitch Tracking & Status</span> — Pitch counts logged by game, practice, or bullpen. Pitch Smart guidelines built in to automatically generate rest status and availability.
        </li>
        <li>
          <span class="font-medium text-highlighted">Programs & Resources</span> — Structured throwing programs, age-specific strength and conditioning, and recovery resources.
        </li>
        <li>
          <span class="font-medium text-highlighted">Individual + Team Experience</span> — Athletes and parents view history, status, and programs. Coaches manage multiple players and receive alerts.
        </li>
      </ol>
    </UPageCard>
  </div>
</section>
</template>
