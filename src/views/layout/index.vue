<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="header-container">
      <my-header></my-header>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <div class="footer-container">
      <my-footer></my-footer>
    </div>
  </van-config-provider>
</template>

<script lang="ts">
import { ConfigProvider } from 'vant' // 引入Vant全局样式配置组件
import { ref } from 'vue'

import MyHeader from './components/Header/index.vue'
import MyFooter from './components/Footer/index.vue'
export default {
  name: 'Layout',
  components: { ConfigProvider, MyHeader, MyFooter },
  setup() {
    /* Vant全局样式配置 */
    const cloudMusicPrimaryColor = '#dd001b'
    const themeVars = ref({
      tabbarHeight: '64px',
      buttonPrimaryBackgroundColor: cloudMusicPrimaryColor,
      buttonPrimaryBorderColor: cloudMusicPrimaryColor,
      tagPrimaryColor: cloudMusicPrimaryColor,
      navBarTextColor: cloudMusicPrimaryColor
    })
    return {
      themeVars
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  width : 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1001;
}
.main-container {
  margin-top: 60px;
  margin-bottom: 60px;
}
.footer-container {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
</style>
