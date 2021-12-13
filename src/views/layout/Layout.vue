<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="main-container">
      <AppMain />
    </div>
    <div class="footer-container">
      <van-sticky position="bottom">
        <MyFooter />
      </van-sticky>
    </div>
  </van-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from 'vant' // 引入Vant全局样式配置组件

import AppMain from './components/AppMain.vue'
import MyFooter from './components/MyFooter.vue'

/* Vant全局样式配置 */
const cloudMusicPrimaryColor = '#dd001b'
const themeVars = ref({
  buttonPrimaryBackgroundColor: cloudMusicPrimaryColor,
  buttonPrimaryBorderColor: cloudMusicPrimaryColor,
  tagPrimaryColor: cloudMusicPrimaryColor,
  navBarTextColor: cloudMusicPrimaryColor
})
</script>
