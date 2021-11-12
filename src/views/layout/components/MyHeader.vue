<template>
  <div class="component-container">
    <!-- <div class="hamberger-container">
      <span class="iconfont icon-hamberger"></span>
    </div> -->
    <div class="searchbar-container">
      <SearchBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
</script>

<style lang="less" scoped>
.component-container {
  height: 100%;
  .searchbar-container {
    height: 100%;
  }
  // display: flex;
  // justify-content: space-evenly;
  // align-items: center;
}
</style>
