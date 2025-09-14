<template>
  <div class="h-[85vh] w-full bg-white rounded-xl shadow-lg overflow-hidden relative">
    <div id="map" class="h-full w-full"></div>

    <div class="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl">
      <h3 class="font-bold text-lg text-slate-800">Live Fleet Status</h3>
      <div class="mt-2 space-y-1">
          <p class="text-slate-600"><span class="font-semibold text-emerald-600">{{ store.liveVehicles.length }}</span> Active Buses</p>
          <p class="text-slate-600"><span class="font-semibold text-slate-800">Delhi NCR</span> Operational Area</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
// --- This is the corrected line ---
import { useMainStore } from '../store/main';
import L from 'leaflet';

const store = useMainStore();
let map = null;
const vehicleMarkers = {};

// A better, custom SVG bus icon
const createBusIcon = (color = '#0284c7') => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32px" height="32px"
      style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5));">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>`;
  
  return L.divIcon({
    html: svgIcon,
    className: '', // remove default background and border
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

onMounted(() => {
  map = L.map('map', { zoomControl: false }).setView([28.6139, 77.2090], 11);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);
});

watch(() => store.liveVehicles, (newVehicles) => {
  if (!map) return;

  newVehicles.forEach(vehicle => {
    const { id, lat, lng, occupancy, targetStop } = vehicle;
    const popupContent = `<b>${id}</b><br>Target: ${targetStop.id}<br>Occupancy: ${occupancy}`;
    
    // Use a different color for high-occupancy buses
    const iconColor = occupancy > 35 ? '#c2410c' : '#0284c7'; // orange-700 or sky-600

    if (vehicleMarkers[id]) {
      vehicleMarkers[id].setLatLng([lat, lng]);
      vehicleMarkers[id].setIcon(createBusIcon(iconColor));
      vehicleMarkers[id].getPopup().setContent(popupContent);
    } else {
      const newMarker = L.marker([lat, lng], { icon: createBusIcon(iconColor) }).addTo(map);
      newMarker.bindPopup(popupContent);
      vehicleMarkers[id] = newMarker;
    }
  });
}, { deep: true });

onUnmounted(() => {
  if (map) map.remove();
});
</script>