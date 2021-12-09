<template>
  <div v-if="artistDetail.artist">
    <CoverItem :src="artistDetail.artist.cover" :name="artistDetail.artist.name" />
    <div class="tabs-area">
      <van-tabs v-model:active="tabIndex">
        <van-tab v-for="item in tabMap" 
          :key="item.value"
          :title="item.title"
          :badge="artistDetail.artist[item.badgeField]"
        />
      </van-tabs>
    </div>
    <div class="main-area">
      <ArtistInfo v-show="tabIndex === 0" :artistDetail="artistDetail" />
      <SongsList v-show="tabIndex === 1" :id="id" />
      <AlbumsList v-show="tabIndex === 2" :id="id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import ArtistInfo from './components/ArtistInfo.vue'
import SongsList from './components/SongsList.vue'
import AlbumsList from './components/AlbumsList.vue'
import CoverItem from '@/components/CoverItem.vue'

import { getArtistDetail } from '@/api/artist'

import { ArtistDetail } from '@/interface/artists'

const route = useRoute()
const router = useRouter()

const tabMap = {
  0: { title: '主页', value: 0, badgeField: '' },
  1: { title: '歌曲', value: 1,  badgeField: 'musicSize' },
  2: { title: '专辑', value: 2, badgeField: 'albumSize' },
  3: { title: '视频', value: 3, badgeField: 'mvSize' }
}

/* data */
const { id } =  route.query
const artistDetail = ref(<ArtistDetail>{})
const tabIndex = ref(0)

/* methods */
/* 根据id, 获取歌手详情 */
const detailArtist = async (id: number) => {
  try {
    const res: any = await getArtistDetail(id)
    artistDetail.value = res.data
  } catch (error) {
    console.log(error)
  }
}

/* 歌手id为空或对应该id的歌手不存在时的事件处理 */
const handleNotFound = (): void => {
  Toast.fail('歌手不存在')
  router.back()
}

/* 返回按钮的点击事件处理 */
const handleClickBack = (): void => {
  router.back() // === $router.go(-1)
}

onMounted(() => {
  !id && handleNotFound()
  id && detailArtist(id)
})
</script>

<style lang="less" scoped>
.tabs-area {
  :deep(.van-badge) {
    zoom: 0.88;
  }
}
.cell-group-card, :deep(.van-list .cell-group-card) {
  margin: 16px;
}
</style>
