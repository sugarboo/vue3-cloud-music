<template>
  <TopNav title="视频" />
  <div class="main-container">
    <div class="sidebar-area">
      <van-sidebar v-model="bar" @change="handleChangeSidebar">
        <van-sidebar-item v-for="item in groupList" :key="item.id" :title="item.name" />
      </van-sidebar>
    </div>
    <div class="right-area">
      <span>test</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getVideoGroupList } from '@/api/video'

import { groupItem } from '@/interface/video'

import TopNav from '@/components/TopNav.vue'
import { log } from 'console'

const bar = ref('')

const groupList = ref<Array<groupItem>>([])
const videoList = ref([])
const offset = ref(0) // 分页请求参数

/* 获取视频标签列表数据 */
const listGroup = async () => {
  const res = await getVideoGroupList()
  groupList.value = res.data
}

/* 侧边栏切换时的监听事件处理 */
const handleChangeSidebar = () => {
  const { id } = groupList.value[Number(bar.value)]
  listVideo(id)
}

/* 获取当前视频标签对应的视频列表数据 */
const listVideo = (id: number) => {
  console.log(id)
  
}

onMounted(() => {
  listGroup()
})
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  .right-area {
    width: 100%;
  }
}
</style>