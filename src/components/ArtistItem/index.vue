<template>
  <div class="artist-item">
    <van-image round fit="cover" :src="data.picUrl + '?param=100y100' || ''" />
    <div class="text-wrap">
      <div class="name single-line">
        <span>{{ data.name }}</span>
        <span v-if="data.trans" class="trans-name">
          &nbsp; ({{ data.trans }})
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArtistItem',

  props: {
    /* 歌手数据 */
    data: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.artist-item {
  display: flex;
  justify-content: space-between;
  .van-image {
    width: 64px;
    height: 64px;
  }
  .text-wrap {
    display: flex;
    align-items: center;
    .name {
      max-width: 168px;
    }
    .trans-name {
      color: #666666;
    }
  }
}
</style>
