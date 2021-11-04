<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="header-container">
      <van-sticky>
        <my-header></my-header>
      </van-sticky>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <div class="footer-container">
      <van-sticky position="bottom">
        <my-footer></my-footer>
      </van-sticky>
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
