<template>
  <div class="app-container">
    <CoverItem :src="detail.coverImgUrl" :name="detail.name || ''" />
    <div class="list-wrap">
      <van-cell class="list-item" v-for="(item, index) in tracksList" :key="item.id">
        <span class="rank">{{ index + 1 }}</span>
        <SongItem :data="item" />
      </van-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { getRankDetail } from '@/api/rank'

import { RankDetail, Track } from '@/interface/rank'

import TopNav from '@/components/TopNav.vue'
import CoverItem from '@/components/CoverItem.vue'
import SongItem from '@/components/SongItem.vue'

const route = useRoute()

/* data */
const detail = ref(<RankDetail>{}) // 排行榜详情数据
const tracksList = ref<Array<Track>>([]) // 排行榜详情列表数据

/* methods */
/* 获取排行榜详情数据 */
const detailRank = async (id: number) => {
  const res: any = await getRankDetail(id)
  detail.value = res.playlist
  const { tracks } = detail.value
  tracks.forEach(item => {
    item.artists = item.ar
    item.album = item.al
  })
  tracksList.value = tracks
}

onMounted(() => {
  const { id = 0 } = route.query
  detailRank(Number(id))
})
</script>

<style lang="less" scoped>
.app-container {
  .list-wrap {
    .list-item {
      position: relative;
      .rank {
        position: absolute;
        top: 0;
        left: 4px;
        z-index: 1000;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: -2px;
      }
    }
  }
}
</style>