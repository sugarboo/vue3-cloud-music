<template>
  <div>
    <van-sticky>
      <SearchBar />
    </van-sticky>

    <div class="swipe-container">
      <HomeSwipe />
    </div>
    <div class="new-songs-container">
      <NewSongs />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import HomeSwipe from './components/HomeSwipe.vue'
import NewSongs from './components/NewSongs.vue'
</script>
