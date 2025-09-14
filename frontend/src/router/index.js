// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Map from '../views/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// This line is essential for the import to work
export default router