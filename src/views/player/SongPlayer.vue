<template>
  <audio class="audio" :src="mp3Url" controls />
  <div class="lyric-area">
    <div>{{ lyric }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import { getSongUrl, getSongLyric } from '@/api/song'

const route = useRoute()
const router = useRouter()

/* data */
const mp3Url = ref('') // 当前歌曲的url
const lyric = ref('') // 当前歌曲的歌词

/* methods */
/* 根据歌曲id, 获取歌曲url */
const fetchSongUrl = async (id: number) => {
  const res: any = await getSongUrl(id)
  const { url } = res.data[0]
  mp3Url.value = url
}

const fetchSongLyric = async (id: number) => {
  const res: any = await getSongLyric(id)
  lyric.value = res.lrc.lyric
}

onMounted(() => {
  const { id } = route.params
  if(!id) {
    Toast.fail('ERROR')
    router.back()
    return
  }
  fetchSongUrl(Number(id))
  fetchSongLyric(Number(id))
})
</script>

<style lang="less" scoped>
.audio {
  width: 100%;
}
</style>
