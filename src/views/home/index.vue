<template>
  <div class="app-container">
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
import { getBannersList, getNewSongList } from "@/api/home" // 引入api

import HomeSwipe from './components/HomeSwipe/index.vue'
import NewSongs from './components/NewSongs/index.vue'

export default {
  name: 'Home',

  components: { HomeSwipe, NewSongs },

  setup() {
    const banners = ref([]) // 轮播图数据
    const newSongsList = ref([]) // 新歌列表数据

    /* 获取轮播图数据 */
    const listBanners = () => {
      getBannersList().then(res => {
        banners.value = res.banners
      })
    }
    
    /* 获取新歌速递数据 */
    const listNewSongs = () => {
      getNewSongList().then(res => {
        newSongsList.value = res.data
      })
    }

    onMounted(() => {
      listBanners()
      listNewSongs()
    })

    return {
      banners,
      newSongsList
    }
  }
}
</script>

<style lang="less" scoped>
</style>
