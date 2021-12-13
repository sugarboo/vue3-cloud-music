<template>
  <div class="mini-player-container">
    <!-- 歌曲进度条 -->
    <van-progress color="#dd001b" stroke-width="2" :show-pivot="false" :percentage="50" />

    <div class="main">
    
    <!-- 播放列表按钮 -->
      <div class="playlist-btn-wrap">
        <van-button class="btn playlist-btn">
          <van-icon name="bars" />
        </van-button>
      </div>    

      <!-- 歌曲信息(歌名, 歌手) -->
      <div class="info-wrap">
        <span class="song-name">Easy On Me</span>
        <span class="sperator">·</span>
        <span class="song-artists">Adele</span>
      </div>

      <!-- 播放/暂停按钮 -->
      <div class="main-btn-wrap">
        <van-button class="btn">
          <van-icon class="play main-btn-play" name="play" />
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.mini-player-container {
  height: 48px;
  line-height: 48px;
  background-color: #ffffff;
  box-shadow: 0 -2px 2px #f2f2f2;
  .main {
    display: flex;
    align-items: center;
    .main-btn-wrap {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .main-btn-play {
        color: #dd001b;
      }
      .main-btn-pause {
        color: #666666;
      }
    }
    .info-wrap {
      flex: 3;
      font-weight: 600;
      font-family: 'Noto Sans SC', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      .song-name, .sperator {
        color: #000000;
      }
      .song-artists {
        color: #666666;
      }
    }
    .playlist-btn-wrap {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .playlist-btn {
        border: none;
      }
    }
  }

  .btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
