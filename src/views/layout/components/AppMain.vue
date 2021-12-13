<template>
  <!-- <keep-alive :include="cachedViews">
    <router-view :key="key" />
  </keep-alive> -->

  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script setup lang="ts">
// import { computed } from "vue"
// import { useRoute } from "vue-router"
// import { useStore } from 'vuex'

// // $route
// const route = useRoute()
// // $store
// const store = useStore()

// const cachedViews = computed(() => {
//   return store.state.tagsView.cachedViews
// })

// const key = computed(() => {
//   return route.fullPath
// })

</script>
