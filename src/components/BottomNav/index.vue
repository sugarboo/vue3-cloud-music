<template>
  <div class="component-container">
    <van-tabbar v-model="active" active-color="#dd001b" inactive-color="#333333">
      <van-tabbar-item name="home">
        <span>发现</span>
        <template #icon="props">
          <span :class="['iconfont', 'icon-wangyiyunyinle1-copy', props.active ? 'iconfont-active' : '']"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my">
        <span>我的</span>
        <template #icon="props">
          <span :class="['iconfont', 'icon-user', props.active ? 'iconfont-active' : '']"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="space">
        <span>云村</span>
        <template #icon="props">
          <span :class="['iconfont', 'icon-pengyouquan', props.active ? 'iconfont-active' : '']"></span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'BottomNav',
  setup() {
    const active = ref('home')
    return {
      active
    }
  }
}
</script>

<style lang="less" scoped>
.component-container {
  height: 100%;

  :root {
    --van-tabbar-height: 60px;
  }
}
</style>
