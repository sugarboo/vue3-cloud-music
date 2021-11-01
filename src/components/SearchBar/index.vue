<template>
  <div class="component-container">
    <van-search
      v-model="keyword"
      shape="round"
      clearable
      input-align="center"
      placeholder="搜索音乐、视频、播客、歌词"
      background="#dd001b"
    >
      <!-- <template #action>
        <van-button round class="search-btn">
          <span>搜索</span>
        </van-button>
      </template> -->
    </van-search>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'SearchBar',
  setup() {
    const keyword = ref('')
    return {
      keyword
    }
  }
}
</script>

<style lang="less" scoped>
.component-container {
  height: 100%;
  :deep(.van-search) {
    height: 100%;
  }
}
</style>
