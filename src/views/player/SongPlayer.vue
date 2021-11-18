<template>
  <div class="page animate__animated animate__fadeOutDown">
    <audio 
      ref="audio"
      class="audio" 
      :src="mp3Url"
      @loadedmetadata="handleLoaded"
      @timeupdate="handleAudioTimeUpdate"
      @ended="handleAudioEnded"
    />
    <div class="top-area" v-if="detail.al">
      <div class="slidedown-btn" @click="handleClickSlideDown">
        <span>∨</span>
      </div>
      <span class="album-name single-line">{{ detail.al.name }}</span>
    </div>
    <div v-if="detail.al" class="cover-area" @click="handleSwitch">
      <van-image v-show="showCover" class="cover" :src="detail.al.picUrl" fit="cover">
        <template v-slot:loading>
          <van-loading type="spinner" size="40" />
        </template>
      </van-image>
      <div v-show="!showCover" class="lyric">
        <div>{{ lyric }}</div>
      </div>
    </div>
    <div class="name-area">
      <div class="song-name single-line">{{ detail.name || '' }}</div>
      <div class="artist-name single-line" v-if="detail.ar">{{ formatArtistsNames(detail.ar) }}</div>
    </div>
    <div class="progress-area">
      <van-count-down ref="dtCountDown" class="count-down" :time="duration * 1000" format="mm:ss" :auto-start="false"></van-count-down>
      <van-progress color="#dd001b" stroke-width="8" :show-pivot="false" :percentage="currentPercentage" />
    </div>
    <div class="btn-area">
      <div class="btn-group">
        <div class="prev-btn">
          <span class="iconfont icon-shangyishou" />
        </div>
        <button class="main-btn" @click="handlePlay">
          <van-icon class="pause" v-if="isPlaying" name="pause" />
          <van-icon class="play" v-else name="play" />
        </button>
        <div class="next-btn">
          <span class="iconfont icon-xiayishou" />
        </div>
      </div>
    </div>
    <div class="blank-area" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import { getSongUrl, getSongLyric, getSongDetail } from '@/api/song'

import { SongDetail } from '@/interface/song'

import { formatArtistsNames } from '@/utils/formatter'

const route = useRoute()
const router = useRouter()

/* data */
const mp3Url = ref('') // 当前歌曲的url
const lyric = ref('') // 当前歌曲的歌词
const detail = ref(<SongDetail>{}) // 当前歌曲的详情
const audio = ref() // audio元素的refs
const isPlaying = ref(false) // 是否正在播放
const duration = ref(0) // 歌曲时长, 从audio标签中的属性获得
const dtCountDown = ref() // 歌曲倒计时的refs
const currentPercentage = ref(0) // 当前播放的百分比
const showCover = ref(true)

/* methods */
/* 根据歌曲id, 获取歌曲url */
const fetchSongUrl = async (id: number) => {
  const res: any = await getSongUrl(id)
  const { url } = res.data[0]
  mp3Url.value = url
}

/* 根据歌曲id, 获取歌曲歌词 */
const fetchSongLyric = async (id: number) => {
  const res: any = await getSongLyric(id)
  lyric.value = res.lrc.lyric
}

/* 根据歌曲id, 获取歌曲详情 */
const detailSong = async (id: number) => {
  const res: any = await getSongDetail(id)
  const { songs } = res
  detail.value = songs[0]
}

/* Top-area 下拉按钮的点击事件处理 */
const handleClickSlideDown = () => {
  router.go(-1)
}

/* 播放/暂停按钮的点击事件处理 */
const handlePlay = () => {
  if (isPlaying.value) {
    audio.value.pause()
    dtCountDown.value.pause()
  } else {
    audio.value.play()
    dtCountDown.value.start()
  }
  isPlaying.value = !isPlaying.value
}

/* 歌曲播放结束时的事件监听处理 */
const handleAudioEnded = () => {
  isPlaying.value = false
  dtCountDown.value.reset()
  currentPercentage.value = 0
}

/* 歌曲加载完毕后的事件监听 */
const handleLoaded = () => {
  duration.value = audio.value.duration
}

/* 歌曲当前播放时间变化时的事件监听 */
const handleAudioTimeUpdate = () => {
  const { currentTime } = audio.value || 0
  if (currentTime) {
    currentPercentage.value = Math.round(currentTime / duration.value * 100)
  }
}

/* 封面/歌词切换的点击事件处理 */
const handleSwitch = () => {
  showCover.value = !showCover.value
}

onMounted(() => {
  const { id } = route.query
  if(!id) {
    Toast.fail('ERROR')
    router.back()
    return
  }
  fetchSongUrl(Number(id))
  detailSong(Number(id))
  fetchSongLyric(Number(id))
})
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #ffffff;
  background: linear-gradient(to bottom, #666666, #000000);
  font-family: 'Noto Sans SC', sans-serif;
  .top-area {
    flex: 2;
    position: relative;
    text-align: center;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    .slidedown-btn {
      position: absolute;
      // top: -2px;
      left: 8px;
      zoom: 1.8;
      transform: scale(1.8, 1);
    }
    .album-name {
      max-width: 240px;
    }
  }
  .cover-area {
    flex: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    .cover {
      width: 84%;
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 12px 0 rgba(128, 128, 128, 0.382);
      :deep(.van-image__img) {
        border-radius: 10px;
      }
    }
    .lyric {
      width: 84%;
      height: 300px;
      overflow: hidden;
    }
  }
  .name-area {
    flex: 2;
    padding-left: 8%;
    max-width: 300px;
    .song-name {
      font-size: 28px;
      letter-spacing: -2px;
    }
  }
  .progress-area {
    flex: 1;
    width: 84%;
    margin: 0 auto;
    .count-down {
      text-align: end;
      color: #ffffff;
    }
  }
  .btn-area {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-group{
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32px;
      .main-btn {
        width: 64px;
        height: 64px;
        border: none;
        border-radius: 50%;
        padding: 4px;
        background: #dd001b;
        .play, .pause {
          // color: #dd001b;
          color: #ffffff;
          zoom: 2;
        }
      }
      .iconfont {
        color: #ffffff;
        zoom: 1.5;
      }
    }
  }
  .blank-area {
    flex: 1;
  }
}

/* 适配iPhone 5/SE */
@media screen and (max-width: 320px) {
  .page {
    .top-area {
      .album-name {
        max-width: 180px;
      }
    }
    .name-area {
      max-width: 250px;
    }
    .btn-area {
      .btn-group {
        gap: 16px;
      }
      .main-btn {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
