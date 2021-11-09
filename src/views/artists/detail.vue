<template>
  <div class="app-container" v-if="artistDetail.artist">
    <van-image class="main-pic" :src="artistDetail.artist.cover + '?param=1024y1024'" fit="cover">
      <div class="artist-name single-line">
        <span>{{ artistDetail.artist.name || '' }}</span>
      </div>
      <div class="back-btn" @click="handleClickBack">
        <van-icon style="color: #FFFFFF; font-weight: 600; zoom: 1.1;" name="arrow-left" />
      </div>
      <template v-slot:loading>
        <van-loading type="spinner" size="40" />
      </template>
    </van-image>
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
      <artist-info v-show="tabIndex === 0" :artistDetail="artistDetail" />
      <songs-list v-show="tabIndex === 1" :id="id" />
      <albums-list v-show="tabIndex === 2" :id="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import TopNav from '@/components/TopNav/index.vue'
import ArtistInfo from './components/ArtistInfo/index.vue'
import SongsList from './components/SongsList/index.vue'
import AlbumsList from './components/AlbumsList/index.vue'

import { getArtistDetail } from '@/api/artist'

export default {
  name: 'ArtistDetail',

  components: { TopNav, ArtistInfo, SongsList, AlbumsList },
  
  setup() {
    const route = useRoute()
    const router = useRouter()

    const tabMap = {
      0: { title: '主页', value: 0, badgeField: '' },
      1: { title: '歌曲', value: 1,  badgeField: 'musicSize' },
      2: { title: '专辑', value: 2, badgeField: 'albumSize' },
      3: { title: '视频', value: 3, badgeField: 'mvSize' }
    }
    
    /* data */
    const { id } = route.query
    const artistDetail = ref({})
    const tabIndex = ref(0)

    /* methods */
    /**
     * 根据id, 获取歌手详情
     */
    const detailArtist = async (id: number) => {
      try {
        const res = await getArtistDetail(id)
        artistDetail.value = res.data
      } catch (error) {
        console.log(error)
        
      }
    }

    /**
     * 歌手id为空或对应该id的歌手不存在时的事件处理
     */
    const handleNotFound = () => {
      Toast.fail('歌手不存在')
      router.back()
    }
    
    /**
     * 返回按钮的点击事件处理
     */
    const handleClickBack = () => {
      router.back() // === $router.go(-1)
    }

    onMounted(() => {
      // const { id } = route.query
      if (!id) {
        handleNotFound()
        return
      }
      detailArtist(id)
    })

    return {
      /* data */
      tabMap,
      id,
      tabIndex,
      artistDetail,
      /* methods */
      handleClickBack
    }
  }
}
</script>

<style lang="less" scoped>

.app-container {
  .main-pic {
    width: 100%;
    height: 305px;
    position: relative;
    .back-btn {
      position: absolute;
      top: 14px;
      left: 14px;
      font-size: 20px;
    }
  }
  .tabs-area {
    :deep(.van-badge) {
      zoom: 0.88;
    }
  }
  .artist-name {
    position: absolute;
    bottom: 0px;
    right: 8px;
    z-index: 1000;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -2px;
    color: #ffffff;
    font-family: 'Noto Sans SC', sans-serif;
  }
  .cell-group-card, :deep(.van-list .cell-group-card) {
    margin: 16px;
  }
}
</style>
