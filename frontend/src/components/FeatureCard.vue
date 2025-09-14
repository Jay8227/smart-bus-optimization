<template>
  <div class="group bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div class="flex items-center space-x-4">
      <div class="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-indigo-600 dark:text-indigo-400">
          <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
    </div>
    <p class="mt-4 text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
    <router-link :to="route" class="inline-block mt-6 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
      Go to {{ title }} &rarr;
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  iconPath: {
    type: String,
    required: true
  }
});
</script>