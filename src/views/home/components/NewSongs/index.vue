<template>
  <div class="component-container">
    <van-divider>新歌速递</van-divider>
    <van-list>
      <!-- <lazy-component> -->
      <van-cell v-for="item in listData.slice(0, 10)" :key="item.id">
        <div class="song-item">
          <van-image class="cover-wrap" :src="item.album.blurPicUrl || ''"></van-image>
          <div class="text-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="artists">
              <span v-for="(artistItem, artistIndex) in item.artists" :key="artistItem.id">
                <span>{{ artistItem.name }}</span>
                <span v-if="artistIndex !== item.artists.length - 1"> / </span>
              </span>
            </div>
          </div>
        </div>
      </van-cell>
      <!-- </lazy-component> -->
    </van-list>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewSongs',
  props: {
    listData: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="less">
.component-container {
  .song-item {
    display: flex;
    justify-content: space-between;
    .cover-wrap {
      width: 64px;
      height: 64px;
      img {
        border-radius: 10px;
      }
    }
    .text-wrap {
      text-align: end;
      .name, .artists {
        max-width: 220px;
        white-space:nowrap;/* 规定文本是否折行 */  
        overflow: hidden;/* 规定超出内容宽度的元素隐藏 */
        text-overflow: ellipsis; /* 超出部分以省略号形式显示 */
      }
      .artists {
        color: #666666;
        font-size: 12px;
      }
    }
  }
}

</style>
