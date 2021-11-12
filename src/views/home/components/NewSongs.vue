<template>
  <div class="component-container">
    <van-divider :style="{ borderColor: '#E57373' }">
      <van-tag type="primary" size="medium" round>&nbsp;最新音乐&nbsp;</van-tag>
    </van-divider>
    <van-list 
      finished-text="没有更多了"
      error-text="加载失败"
      :loading="listLoading"
      :finished="listFinished" 
      @load="handleLoadList"
    >
      <van-cell v-for="item in list" :key="item['id']">
        <SongItem :data="item" />
      </van-cell>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { getNewSongList } from '@/api/home' // 引入api

import SongItem from '@/components/SongItem.vue' // 引入自定义组件

/* data */
const allList = ref([]) // 所有新歌列表数据(100条)
const list = ref([]) // 当前显示的列表数据
const limit = 20
const listLoading = ref(false)
const listFinished = ref(false)
let hasMore = true

/* methods */
/**
 * 获取新歌速递列表数据
 */
const listNewSongs = async () => {
  try {
    const res: any = await getNewSongList()
    allList.value = res.data
  } catch (error) {
    console.log(error)
  }
}

/**
 * van-list触底时的事件处理
 */
const handleLoadList = () => {
  if (!allList.value.length) {
    listNewSongs().then(() => {
      loadList()
    })
    return
  }
  loadList()
}

/**
 * 加载更多列表数据
 */
const loadList = () => {
  listLoading.value = true
  // 获取需要加载数据的位置索引, 为当前显示的列表的最后一个元素的索引 + 1, 即list.length
  const index = list.value.length
  // 是否存在更多的待加载数据: 当list.length !== allList.length时, 存在待加载的数据
  hasMore = index !== allList.value.length ? true : false
  if (hasMore) {
    list.value = [...list.value, ...allList.value.slice(index, index + limit)]
    listLoading.value = false
    return
  }
  listLoading.value = false
  listFinished.value = true
}
</script>
