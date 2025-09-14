// src/store/main.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  // --- STATE ---
  const timestamp = ref(null);
  const liveVehicles = ref([]); // For the map and bus count
  const alerts = ref([]); // For the live log
  
  // For the charts and KPIs
  const schedule = ref({
    optimized: [] 
  });
  
  const impact = ref({
    unmetDemand: { reduction_percent: 0 },
    wastedCapacity: { reduction_percent: 0 }
  });

  // You would add functions here later to fetch and update this data

  return { timestamp, liveVehicles, alerts, schedule, impact }
})