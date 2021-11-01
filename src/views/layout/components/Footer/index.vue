<template>
  <div class="component-container">
    <bottom-nav></bottom-nav>
  </div>
</template>

<script lang="ts">
import BottomNav from '@/components/BottomNav/index.vue'

export default {
  name: 'MyFooter',
  components: { BottomNav }
}
</script>

<style lang="less" scoped>
.component-container {
  height: 100%;
}
</style>
