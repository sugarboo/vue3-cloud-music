<template>
  <div class="song-item">
    <van-image :src="data.album.blurPicUrl || ''" alt="cover"></van-image>
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

<script lang="ts">
export default {
  name: 'SongItem',
  props: {
    /* 歌曲数据 */
    data: {
      type: Object,
      require: true
    }
  }
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
