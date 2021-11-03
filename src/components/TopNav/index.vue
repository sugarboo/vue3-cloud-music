<template>
  <div class="component-container">
    <van-nav-bar :title="title">
      <template #left>
        <div class="home-btn" @click="handleClickHome">
          <van-icon style="color: #dd001e;" name="wap-home-o" />
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
     * 首页按钮的点击事件处理
     */
    const handleClickHome = () => {
      router.push({
        name: 'Home'
      })
    }

    return {
      /* methods */
      handleClickHome
    }
  }
}
</script>

<style lang="less" scoped>
.component-container {
  .home-btn {
    font-size: 20px;
  }
}
</style>
