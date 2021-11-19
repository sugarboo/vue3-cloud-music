<template>
  <van-image class="main-pic" :src="src + '?param=1024y1024'" fit="cover">
    <div class="name single-line">
      <div class="sub-name">{{ subName || '' }}</div>
      <div>{{ name || '' }}</div>
    </div>
    <div class="back-btn" @click="handleClickBack">
      <van-icon style="color: #FFFFFF; font-weight: 600; zoom: 1.1;" name="arrow-left" />
    </div>
    <template v-slot:loading>
      <van-loading type="spinner" size="40" />
    </template>
  </van-image>
</template>

<script setup lang="ts">
import router from '@/router'

const props = defineProps<{
  src: string,  // 封面图片url
  name: string // 名字
  subName?: string // 二级名字
}>()

const handleClickBack = (): void => {
  router.back()
}
</script>

<style lang="less" scoped>
.main-pic {
  width: 100%;
  height: 255px; // (667 * 1 - 0.618)
  position: relative;
  .name {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -2px;
    color: #ffffff;
    font-family: 'Noto Sans SC', sans-serif;
    position: absolute;
    bottom: 0px;
    right: 8px;
    z-index: 1000;
    .sub-name {
      text-align: end;
      font-size: 20px;  
      letter-spacing: -1px;
      color: #f6f6f6;
    }
  }
  .back-btn {
    position: absolute;
    top: 14px;
    left: 14px;
    font-size: 20px;
  }
  
}
</style>