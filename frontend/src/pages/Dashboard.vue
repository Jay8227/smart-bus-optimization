<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">System Dashboard</h1>
      <p v-if="store.timestamp" class="text-sm text-slate-500 dark:text-slate-400">
        Last Update: {{ new Date(store.timestamp).toLocaleTimeString() }}
      </p>
    </div>

    <div v-if="store.impact.unmetDemand" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="kpi-card">
        <div class="kpi-icon bg-emerald-100 text-emerald-600">📉</div>
        <div>
          <p class="kpi-title">Unmet Demand</p>
          <p class="kpi-value">{{ store.impact.unmetDemand.reduction_percent }}% Reduction</p>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon bg-sky-100 text-sky-600">📊</div>
        <div>
          <p class="kpi-title">Wasted Capacity</p>
          <p class="kpi-value">{{ store.impact.wastedCapacity.reduction_percent }}% Reduction</p>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon bg-amber-100 text-amber-600">🚌</div>
        <div>
          <p class="kpi-title">Active Buses</p>
          <p class="kpi-value">{{ store.liveVehicles.length }} Vehicles</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Bus Allocation vs. Demand</h2>
        <div v-if="chartData.labels.length > 0" class="h-96">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
        <div v-else class="text-gray-500 h-96 flex items-center justify-center">
          Waiting for schedule data...
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Live System Log</h2>
        <div class="space-y-3 h-96 overflow-y-auto pr-2">
          <div v-for="(alert, index) in store.alerts" :key="index" class="text-sm p-3 rounded-lg" :class="alert.type === 'info' ? 'bg-sky-50 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200' : 'bg-amber-50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'">
            <span class="font-semibold">{{ alert.time }}:</span> {{ alert.message }}
          </div>
          <div v-if="store.alerts.length === 0" class="text-gray-500 text-center pt-16">No system events.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '../store/main';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useMainStore();

const chartData = computed(() => ({
    labels: store.schedule.optimized.map(s => new Date(s.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'Passenger Demand',
        backgroundColor: '#a5b4fc',
        data: store.schedule.optimized.map(s => s.demand),
        borderRadius: 4,
      },
      {
        label: 'Buses Allocated',
        backgroundColor: '#4f46e5',
        data: store.schedule.optimized.map(s => s.buses_allocated),
        borderRadius: 4,
      },
    ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { 
    y: { 
      beginAtZero: true,
      ticks: { color: '#9ca3af' }, // Text color for dark mode
      grid: { color: '#4b5563' }   // Grid line color for dark mode
    }, 
    x: { 
      grid: { display: false },
      ticks: { color: '#9ca3af' } // Text color for dark mode
    } 
  },
  plugins: {
    legend: {
      labels: {
        color: '#9ca3af' // Legend text color for dark mode
      }
    }
  }
};
</script>

<style scoped>
.kpi-card { @apply bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex items-center space-x-4; }
.kpi-icon { @apply text-2xl w-14 h-14 flex items-center justify-center rounded-full; }
.kpi-title { @apply text-sm font-medium text-slate-500 dark:text-slate-400; }
.kpi-value { @apply text-2xl font-bold text-slate-800 dark:text-slate-100; }
</style>