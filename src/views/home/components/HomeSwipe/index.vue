<template>
  <div class="component-container">
    <van-swipe
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="(item, index) in images" 
        :key="item.imageUrl"
      >
        <van-image :src="item.imageUrl || ''">
          <div :class="['banner-tag', index % 2 === 0 ? 'bg-color-red' : 'bg-color-blue']">
            <span>{{ item.typeTitle }}</span>
          </div>
        </van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeSwiper',
  props: {
    images: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.van-image {
  position: relative;
  .banner-tag {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 2px;
    padding: 4px;
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
