<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
        Real-Time Transit Intelligence
      </h1>
      <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
        Leveraging live data to dynamically optimize bus fleet allocation, reduce wait times, and enhance passenger experience across the city.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
      <FeatureCard
        v-for="feature in features"
        :key="feature.title"
        :title="feature.title"
        :description="feature.description"
        :route="feature.route"
        :icon-path="feature.iconPath"
      />
    </div>
  </div>
</template>

<script setup>
import FeatureCard from '../components/FeatureCard.vue';

const features = [
  {
    title: 'Live Dashboard',
    description: 'Monitor key performance indicators, view real-time passenger demand, and analyze system efficiency at a glance.',
    route: '/dashboard',
    // SVG Path for a chart icon
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z'
  },
  {
    title: 'Interactive Fleet Map',
    description: 'Track all active buses in real-time on an interactive map. View occupancy, speed, and heading for each vehicle.',
    route: '/map',
    // SVG Path for a map icon
    iconPath: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.5c0-.621.504-1.125 1.125-1.125H7.5" stroke-linecap="round" stroke-linejoin="round" /> <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-6-6m0 0l-6 6m6-6v12'
  }
];
</script>