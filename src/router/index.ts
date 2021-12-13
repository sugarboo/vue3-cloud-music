import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      /* 首页 */
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue')
      },
      /* 歌手 - 列表页 */
      {
        path: '/artists',
        name: 'ArtistsList',
        component: () => import('@/views/artists/ArtistsList.vue')
      },
      /* 歌手 - 详情页 */
      {
        path: '/artists/detail',
        name: 'ArtistDetail',
        component: () => import('@/views/artists/ArtistDetail.vue')
      },
      /* 排行榜 - 列表页 */
      {
        path: '/rank',
        name: 'RankList',
        component: () => import('@/views/rank/RankList.vue')
      },
      /* 排行榜 - 详情页 */
      {
        path: '/rank/detail',
        name: 'RankDetail',
        component: () => import('@/views/rank/RankDetail.vue')
      },
      /* 专辑 - 详情页 */
      {
        path: '/album/detail',
        name: 'AlbumDetail',
        component: () => import('@/views/album/AlbumDetail.vue')
      },
      /* 视频 - 列表页 */
      {
        path: '/video',
        name: 'VideoList',
        component: () => import('@/views/video/VideoList.vue')
      },
    ]
  },

  /* 音乐播放页 */
  {
    path: '/player',
    name: 'SongPlayer',
    component: () => import('@/views/player/SongPlayer.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
