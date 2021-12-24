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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Redirect.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Home.vue')
  },
  {
    path: '/toptracks',
    name: 'TopTrack',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Top.vue')
  },
  {
    path: '/topartists',
    name: 'TopArtist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Top.vue')
  },
  {
    path: '/playlist',
    name: 'Playlist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Playlist.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
