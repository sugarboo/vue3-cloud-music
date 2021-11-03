<template>
  <div>
    <div class="swipe-container">
      <home-swipe :images="banners"></home-swipe>
    </div>
    <div class="new-songs-container">
      <new-songs :listData="newSongsList"></new-songs>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { getBannersList } from '@/api/home' // 引入接口

import HomeSwipe from './components/HomeSwipe/index.vue'
import NewSongs from './components/NewSongs/index.vue'

export default {
  name: 'Home',

  components: { HomeSwipe, NewSongs },

  setup() {
    /* data */
    const banners = ref([]) // 轮播图数据
    const newSongsList = ref([]) // 新歌列表数据

    /* methods */
    /**
     * 获取轮播图数据
     */
    const listBanners = async () => {
      try {
        const res = await getBannersList()
        banners.value = res.banners
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      listBanners()
    })

    return {
      banners,
      newSongsList
    }
  }
}
</script>
