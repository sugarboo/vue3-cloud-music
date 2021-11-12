<template>
  <van-sticky>
    <!-- <top-nav class="top-nav" title="歌手列表"></top-nav> -->
    <TopNav title="歌手列表" />
  </van-sticky>
  <div class="main-container">
    <div class="left-area">
      <van-sticky offset-top="48px">
        <van-sidebar v-model="areaIndex" @change="handleChangeSidebar">
            <van-sidebar-item v-for="item in areaMap" :key="item.value" :title="item.title" />
        </van-sidebar>
      </van-sticky>
    </div>
    <div class="right-area">
      <van-sticky offset-top="48px">
        <van-tabs v-model:active="typeIndex" @change="handleChangeTab">
          <van-tab v-for="item in typeMap" :key="item.value" :title="item.title"></van-tab>
        </van-tabs>
      </van-sticky>
      <van-list
        :loading="listLoading"
        @load="handleLoadList"
        :finished="!hasMore"
        finished-text="没有更多了"
      >
        <van-cell v-for="item in artistsList" :key="item.id">
          <ArtistItem :data="item" @click="handleClickDetail(item.id)" />
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* 引入api */
import { getArtistsList } from '@/api/artist' // 引入接口

/* 引入interface */
import { ListQuery, Artist } from '@/interface/artists'

import ArtistItem from '@/components/ArtistItem.vue'
import TopNav from '@/components/TopNav.vue'

const router = useRouter()

const typeMap = {
  0: { title: '全部', value: -1 },
  1: { title: '男歌手', value: 1 },
  2: { title: '女歌手', value: 2 },
  3: { title: '乐队', value: 3 },
}
const areaMap = {
  0: { title: '全部', value: -1 },
  1: { title: '华语', value: 7 },
  2: { title: '欧美', value: 96 },
  3: { title: '日本', value: 8 },
  4: { title: '韩国', value: 16 },
  5: { title: '其他', value: 0 },
}

/* data */
const typeIndex = ref(0) // 歌手类型序号, 默认为全部(0)
const areaIndex = ref(0) // 地区序号, 默认为全部(0)
const limit = 20
let page = -1 // 当前页码, 默认为-1(第一页)

const query = {
  type: typeMap[typeIndex.value].value,
  area: areaMap[areaIndex.value].value,
  limit,
  offset: page * limit // 偏移数量，用于分页 , 如 :(页数 - 1) * 30, 其中30为limit的值
}

const artistsList = ref<Array<Artist>>([])
const hasMore = ref(true)
const listLoading = ref(false)

/* methods */
/**
 * 获取歌手列表
 */
const listArtists = async (query: ListQuery) => {
  listLoading.value = true
  try {
    const res: any = await getArtistsList(query)
    const { artists, more } = res
    artistsList.value = [...artistsList.value, ...artists]
    hasMore.value = more
    listLoading.value = false
  } catch (error) {
    hasMore.value = false
    listLoading.value = false
    console.log(error)
  }
}

/**
 * 触底加载更多
 */
const handleLoadList = () => {
  if (hasMore.value) {
    page++
    query.offset = page * limit
    listArtists(query)
  }
}

/**
 * 侧边栏切换时的事件处理
 */
const handleChangeSidebar = () => {
  artistsList.value.length = 0
  page = 0 // 重置页码
  query.offset = page * limit
  query.area = areaMap[areaIndex.value].value
  listArtists(query)
}

/**
  * 顶部tab栏切换时的事件处理
  */
const handleChangeTab = () => {
  artistsList.value.length = 0
  page = 0 // 重置页码
  query.offset = page * limit
  query.type = typeMap[typeIndex.value].value
  listArtists(query)
}

/**
  * 歌手行的点击事件处理: 跳转到对应的歌手详情页面
  */
const handleClickDetail = (id: number) => {
  router.push({
    name: 'ArtistDetail',
    query: { id }
  })
}
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  .right-area {
    width: 100%;
  }
}
</style>
