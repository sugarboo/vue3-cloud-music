<template>
  <CoverItem :src="detail.blurPicUrl" :name="detail.name || ''" :subName="detail.artist ? detail.artist.name: ''" />
  <van-tabs v-model:active="tab">
    <van-tab title="曲目" name="list">
      <van-cell-group inset class="list-area">
        <van-cell
          v-for="item in songsList"
          :key="item.id"
          :title="item.name"
          :label="formatArtistsNames(item.ar)"
          class="single-line"
          @click="handlePlaySong(item.id)"
        />
      </van-cell-group>
    </van-tab>
    <van-tab title="简介" name="desc">
      <van-cell-group inset class="desc-area">
        <van-cell title="专辑名" :label="detail.name || ''" />
        <van-cell title="歌手" :label="detail.artist ? detail.artist.name: ''" />
        <van-cell title="发行公司" :label="detail.company || ''" />
        <van-cell title="发行时间" :label="formatUnixTime(detail.publishTime)" />
        <van-cell title="专辑介绍" :label="detail.description" />
      </van-cell-group>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getAlbumDetail } from '@/api/album'

import { AlbumDetail, SongItem } from '@/interface/album'
import { Ar } from '@/interface/index'

import { formatArtistsNames, formatUnixTime } from '@/utils/formatter'

import CoverItem from '@/components/CoverItem.vue'

const route = useRoute()
const router = useRouter()

/* data */
const detail = ref(<AlbumDetail>{}) // 专辑详情数据
const songsList = ref<Array<SongItem>>([]) // 专辑曲目列表数据
const tab = ref('list')

/* methods */
/* 获取专辑详情数据 */
const detailAlbum = async (id: number) => {
  const res:any = await getAlbumDetail(id)
  detail.value = res.album
  songsList.value = res.songs
}

/* 歌曲点击的事件处理: 跳转到歌曲播放页 */
const handlePlaySong = (id: number) => {
  router.push({
    name: 'SongPlayer',
    query: { id }
  })
}

onMounted(() => {
  const { id = 0 } = route.query
  detailAlbum(Number(id))
})
</script>

<style lang="less" scoped>
:deep(.van-tabs__content) {
  padding: 14px 0;
}
</style>

