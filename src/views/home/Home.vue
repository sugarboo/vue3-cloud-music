<template>
  <div>
    <div class="swipe-container">
      <HomeSwipe />
    </div>
    <div class="new-songs-container">
      <NewSongs />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入自定义组件
import HomeSwipe from './components/HomeSwipe.vue'
import NewSongs from './components/NewSongs.vue'
</script>
