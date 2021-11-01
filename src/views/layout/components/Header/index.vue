<template>
  <div class="component-container">
    <!-- <div class="hamberger-container">
      <span class="iconfont icon-hamberger"></span>
    </div> -->
    <div class="searchbar-container">
      <search-bar></search-bar>
    </div>
  </div>
</template>

<script lang="ts">
import SearchBar from '@/components/SearchBar/index.vue'
export default {
  name: 'MyHeader',
  components: { SearchBar },
  setup() {
    return {

    }
  }
}
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
