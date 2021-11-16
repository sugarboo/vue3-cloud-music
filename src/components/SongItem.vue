<template>
  <div class="song-item" @click="handlePlaySong(data.id)">
    <van-image fit="cover" :src="data.album.blurPicUrl || data.album.picUrl + '?param=100y100' || ''" alt="cover" lazy-load>
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div class="text-wrap">
      <div class="name single-line">{{ data.name }}</div>
      <div class="artists single-line">
        <span v-for="(artistdata, artistIndex) in data.artists" :key="artistdata.id">
          <span>{{ artistdata.name }}</span>
          <span v-if="artistIndex !== data.artists.length - 1"> / </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { SongItem } from '@/interface/home'

const props = defineProps<{
  data: SongItem // 歌曲信息
}>()

const router = useRouter()

/* 点击歌曲, 跳转到音乐播放页面 */
const handlePlaySong = (id: number) => {
  router.push({
    name: 'SongPlayer',
    params: { id }
  })
}
</script>

<style lang="less" scoped>
.song-item {
  display: flex;
  justify-content: space-between;
  .van-image {
    width: 64px;
    height: 64px;
    :deep(.van-image__img) {
      border-radius: 10px;
    }
  }
  .text-wrap {
    text-align: end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name, .artists {
      max-width: 200px;
    }
    .artists {
      color: #888888;
      font-size: 12px;
    }
  }
}
</style>
