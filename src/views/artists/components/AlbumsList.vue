<template>
    <van-list
      :loading="listLoading"
      @load="handleLoadList"
      :finished="!hasMore"
      finished-text="没有更多了"
    >
      <van-cell-group inset class="cell-group-card">
          <van-cell v-for="item in list" :key="item.id" :value="item.name">
            <template #title>
              <van-image :src="item.blurPicUrl + '?param=100y100' || ''" alt="cover" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </template>
            <template #value>
              <div class="name-and-date">
                <div class="name">{{ item.name }}</div>
                <div class="date">{{ FormatPublishTime(item.publishTime) }}</div>
              </div>
            </template>
          </van-cell>
      </van-cell-group>
    </van-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getArtistAlbumsList } from '@/api/artist'

import { AlbumsListQuery, AlbumItem } from '@/interface/artists'

const props = defineProps<{
  id: number // 歌手id
}>()

/* data */
const id = props.id
const list = ref<AlbumItem[]>([])
const limit = 20
let page = -1
const query = {
  id,
  offset: page * limit // 偏移数量，用于分页 , 如 :(页数 - 1) * 30, 其中30为limit的值
}
const hasMore = ref(true)
const listLoading = ref(false)

/* methods */
/**
 * 发送请求, 获取专辑列表
 */
const listAlbums = async (query: AlbumsListQuery) => {
  listLoading.value = true
  try {
    const res: any = await getArtistAlbumsList(query)
    const { hotAlbums, more } = res
    list.value = [...list.value, ...hotAlbums]
    hasMore.value = more
    listLoading.value = false
  } catch (error) {
    hasMore.value = false
    listLoading.value = false
    console.log(error)
  }
}
/**
 * van-list触底时的事件处理: 专辑列表 加载更多
 */
const handleLoadList = () => {
  if (hasMore.value) {
    page++
    query.offset = page * limit
    listAlbums(query)
  }
}

/** 
 * 专辑发行时间格式处理
 */
const FormatPublishTime = (time: string) => {
  return new Date(time).toLocaleString('chinese', { 'hour12': false }).split(' ')[0].split('/').join('-')
}

onMounted(() => {
  handleLoadList()
})
</script>

<style lang="less" scoped>
.van-image {
  width: 64px;
  height: 64px;
  :deep(.van-image__img) {
    border-radius: 10px;
  }
}
.name-and-date {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    color: #323233; // --van-gray-8
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; // 最多显示两行
    overflow: hidden;
  }
  .date {
    font-size: 12px;
  }
}
</style>
