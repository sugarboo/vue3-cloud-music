<template>
  <div class="component-container">
    <van-nav-bar :title="title">
      <template #left>
        <div class="back-btn" @click="handleClickBack">
          <van-icon style="color: #dd001e; font-weight: 600; zoom: 1.1;" name="arrow-left" />
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
  name: 'TopNav',
  props: {
    // 顶部导航栏标题
    title: {
      type: String,
      require: true
    }
  },
  setup() {
    const router = useRouter()

    /* methods */
    /**
     * 返回按钮的点击事件处理
     */
    const handleClickBack = () => {
      router.back() // === $router.go(-1)
    }

    return {
      /* methods */
      handleClickBack,
      router
    }
  }
}
</script>

<style lang="less" scoped>
.component-container {
  .back-btn {
    font-size: 20px;
  }
}
</style>
