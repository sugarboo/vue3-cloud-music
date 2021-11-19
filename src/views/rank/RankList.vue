<template>
  <van-sticky>
    <TopNav title="排行榜" />
  </van-sticky>
  <div class="main-area">
    <van-row>
      <van-col v-for="item in list" :key="item.id" span="8"  class="rank-item-col" @click="handleClickRankItem(item.id)">
        <van-image class="cover" :src="item.coverImgUrl + '?param=100y100'"></van-image>
        <div class="name single-line">{{ item.name }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TopNav from '@/components/TopNav.vue'

import { getRankList } from '@/api/rank'

import { RankItem } from '@/interface/rank'

const router = useRouter()

/* data */
const list = ref<Array<RankItem>>([]) // 排行榜列表

/* methods */
/* 获取排行榜列表数据 */
const listRank = async () => {
  const res:any = await getRankList()
  list.value = res.list
}

/* 排行榜的点击事件处理 */
const handleClickRankItem = (id: number): void => {
  router.push({
    name: 'RankDetail',
    query: { id }
  })
}

onMounted(() => {
  listRank()
})

</script>

<style lang="less" scoped>
.main-area {
  text-align: center;
  .rank-item-col {
    margin-top: 16px;
    .cover {
      :deep(.van-image__img) {
        border-radius: 10px;
      }
    }
    .name {
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>