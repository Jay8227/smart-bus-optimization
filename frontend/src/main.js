// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Import Pinia
import './style.css'
import 'leaflet/dist/leaflet.css'; // 2. Import Leaflet's CSS for the map

import App from './APP.vue'
import router from './Router'

const app = createApp(App)
const pinia = createPinia() // 3. Create a Pinia instance

app.use(router)
app.use(pinia) // 4. Tell Vue to use Pinia

app.mount('#app')