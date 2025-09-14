<template>
  <nav class="flex items-center justify-between px-6 py-4 shadow-md bg-gray-100 dark:bg-gray-800">
    <!-- Left: Logo / Title -->
    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
      Smart Bus Optimization
    </div>

    <!-- Middle: Nav links -->
    <ul class="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
      <li><a href="#" class="hover:text-blue-600 dark:hover:text-yellow-400">Home</a></li>
      <li><a href="#" class="hover:text-blue-600 dark:hover:text-yellow-400">Dashboard</a></li>
      <li><a href="#" class="hover:text-blue-600 dark:hover:text-yellow-400">Map</a></li>
      <li><a href="#" class="hover:text-blue-600 dark:hover:text-yellow-400">Contact</a></li>
    </ul>

    <!-- Right: Dark Mode Toggle -->
    <button
      @click="toggleDark"
      class="px-3 py-2 rounded-lg bg-blue-600 text-white dark:bg-yellow-400 dark:text-black transition"
    >
      {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
}

// sync with <html class="dark"> for Tailwind dark mode
watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
