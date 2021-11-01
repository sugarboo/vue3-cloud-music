<template>
  <div class="app-container">
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
  </div>
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
    const themeVars = ref({
      tabbarHeight: '60px',
      buttonPrimaryBackgroundColor: '#dd001b',
      buttonPrimaryBorderColor: '#dd001b'
    })
    return {
      themeVars
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  .header-container {
    width : 100%;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .main-container {
    margin: 60px 0;
  }
  .footer-container {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    z-index: 1000;
  }
}
</style>
