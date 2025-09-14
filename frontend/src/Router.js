import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Dashboard from './pages/Dashboard.vue'
import MapView from './pages/MapView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/map', name: 'Map', component: MapView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router