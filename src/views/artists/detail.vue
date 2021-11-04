<template>
  <div class="app-container" v-if="artistDetail.artist">
    <!-- <top-nav :title="artistDetail.artist.name"></top-nav> -->
    <van-image class="main-pic" :src="artistDetail.artist.cover + '?param=1024y1024'" fit="cover">
      <div class="artist-name single-line">
        <span>{{ artistDetail.artist.name || '' }}</span>
      </div>
    </van-image>
    <div class="tabs-area">
      <van-tabs v-model:active="tabIndex">
        <van-tab v-for="item in tabMap" :key="item.value" :title="item.title"></van-tab>
      </van-tabs>
    </div>
    <!-- div.main-area -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import TopNav from '@/components/TopNav/index.vue'

import { getArtistDetail } from '@/api/artist'

export default {
  name: 'ArtistDetail',

  components: { TopNav },
  
  setup() {
    const route = useRoute()
    const router = useRouter()

    const tabMap = {
      0: { title: '主页', value: 0 },
      1: { title: '歌曲', value: 1 },
      2: { title: '专辑', value: 2 },
      3: { title: '视频', value: 3 }
    }
    
    /* data */
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

    onMounted(() => {
      const { id } = route.query
      if (!id) {
        handleNotFound()
        return
      }
      detailArtist(id)
    })

    return {
      /* data */
      tabMap,
      tabIndex,
      artistDetail
    }
  }
}
</script>

<style lang="less" scoped>

.app-container {
  .main-pic {
    position: relative;
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
}
</style>
