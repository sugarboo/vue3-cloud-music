<template>
  <van-list
    :loading="listLoading"
    @load="handleLoadList"
    :finished="!hasMore"
    finished-text="没有更多了"
  >
    <van-cell-group inset class="cell-group-card">
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :label="getSongsArtistsNames(item.ar)"
        class="single-line"
        @click="handlePlaySong(item.id)"
      />
    </van-cell-group>
  </van-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'

import { getArtistSongsList } from '@/api/artist'

import { SongsListQuery, SongItem, SongsAr } from '@/interface/artists'

const props = defineProps<{
  id: number // 歌手id
}>()

const router = useRouter()

/* data */
const { id } = props
const list = ref<Array<SongItem>>([])
const limit = 20
let page = -1
const query = {
  id,
  limit,
  order: 'hot',
  offset: page * limit // 偏移数量，用于分页 , 如 :(页数 - 1) * 30, 其中30为limit的值
}
const hasMore = ref(true)
const listLoading = ref(false)
/* methods */
/* 发送请求, 获取歌曲列表 */
const listSongs = async (query: SongsListQuery) => {
  listLoading.value = true
  try {
    const res: any = await getArtistSongsList(query)
    const { songs, more } = res
    list.value = [...list.value, ...songs]
    hasMore.value = more
    listLoading.value = false
  } catch (error) {
    hasMore.value = false
    listLoading.value = false
    console.log(error)
  }
}

/* van-list触底时的事件处理: 歌曲列表 加载更多 */
const handleLoadList = () => {
  if (hasMore.value) {
    page++
    query.offset = page * limit
    listSongs(query)
  }
}

/* 获取当前歌曲所有参与的歌手名字字符串 */
const getSongsArtistsNames = (artistsList: Array<SongsAr>) => {
  let names = ''
  artistsList.forEach((item, index) => {
    names += index === artistsList.length - 1 ? item.name : `${item.name} / `
  })
  return names
}

/* 歌曲点击的事件处理: 跳转到歌曲播放页 */
const handlePlaySong = (id: number) => {
  router.push({
    name: 'SongPlayer',
    params: { id }
  })
}

onMounted(() => {
  handleLoadList()
})
</script>
