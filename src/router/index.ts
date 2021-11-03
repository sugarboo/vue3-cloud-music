import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Layout from '@/views/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: '',
    redirect: '/home',
    children: [
      /* 首页 */
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      
    ]
  },

  /* 歌手页 */
  {
    path: '/artists',
    name: 'Artists',
    component: () => import('@/views/artists/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
