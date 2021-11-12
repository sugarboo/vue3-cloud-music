<template>
  <div class="component-container">
    <van-swipe
      :show-indicators="false"
      :autoplay="5000"
    >
      <van-swipe-item
        v-for="item in banners" 
        :key="item.imageUrl"
      >
        <van-image fit="cover" :src="item.imageUrl || ''" alt="swipe">
          <div :class="['banner-tag', `bg-color-${item.titleColor}`]">
            <span>{{ item.typeTitle }}</span>
          </div>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBannersList } from '@/api/home' // 引入接口

import { Banner } from '@/interface/home'

/* data */
let banners = ref<Banner[]>([]) // 轮播图数据

/* methods */
/**
  * 获取轮播图数据
  */
const listBanners = async () => {
  try {
    const res: any = await getBannersList()
    banners.value = res.banners
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  listBanners()
})
</script>

<style lang="less" scoped>
.van-image {
  width: 100%;
  position: relative;
  .banner-tag {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 1px;
    padding: 2px 2px 2px 6px;
    border-radius: 10px 0 0 0;
  }
  .bg-color-red {
    background: linear-gradient(to left,#dd001b, #E57373);
    // background-color: #dd001b;
  }
  .bg-color-blue {
    background: linear-gradient(to left,#4a79cc, #1b2b60);
  }
}
</style>
