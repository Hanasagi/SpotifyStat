import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('../components/Redirect.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/toptracks',
    name: 'TopTrack',
    component: () => import('../components/Top.vue')
  },
  {
    path: '/topartists',
    name: 'TopArtist',
    component: () => import('../components/Top.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
