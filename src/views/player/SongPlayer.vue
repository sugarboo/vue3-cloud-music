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
    <div class="cover-area" @click="handleSwitch">
      <van-image v-if="detail.al" v-show="showCover" class="cover" :src="detail.al.picUrl" fit="cover">
        <template v-slot:loading>
          <van-loading type="spinner" size="40" />
        </template>
      </van-image>
      <div v-show="!showCover" class="lyric" ref="lyricDiv">
        <ul ref="lyricContent" class="lyric-container">
          <li :class="['lyric-item', refActiveLyricIndex === index ? 'active-lyric' : 'inactive-lyric']" v-for="(item, index) in lyric" :key="item.id" :data-index="index">{{ item.content }}</li>
        </ul>
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
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { Toast } from 'vant'

import { getSongUrl, getSongLyric, getSongDetail } from '@/api/song'

import { SongDetail, LyricItem } from '@/interface/song'

import { formatArtistsNames } from '@/utils/formatter'

const route = useRoute()
const router = useRouter()

/* data */
const mp3Url = ref('') // 当前歌曲的url
const lyric = ref<Array<LyricItem>>([]) // 当前歌曲的歌词
const detail = ref(<SongDetail>{}) // 当前歌曲的详情
const audio = ref<any>() // audio元素的refs
const isPlaying = ref(false) // 是否正在播放
const duration = ref(0) // 歌曲时长, 从audio标签中的属性获得
const dtCountDown = ref<any>() // 歌曲倒计时的refs
const currentPercentage = ref(0) // 当前播放的百分比

const showCover = ref(true) // 封面 / 歌词的切换状态
const refActiveLyricIndex = ref(0)
const lyricDiv = ref<any>() // 高度固定的歌词外层div
const lyricContent = ref<any>() // 歌词区域容器Dom
let lyricDivHeight: number = 0 // 歌词外层容器(lyricDiv)的高度
let lyricScrollHeight: number = 0 // 歌词区域滚动高度
let activeLyricIndex = 0 // 全局保存当前高亮歌词的索引

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
  const { lyric: resLyric } = res.lrc

  // 处理获取到的歌词数据
  const lyricArr: Array<string> = resLyric.split(/\n/) // 根据换行符, 将获取到的歌词数据切割为字符串数组
  
  const lyricObjArr: Array<LyricItem> = [] // 遍历lyricArr, 构造Array<LyricItem>
  lyricArr.forEach(item => {
    let time = item.split(']')[0].substring(1)
    let content = item.split(']')[1]
    if (content) {
      lyricObjArr.push({
        time: formatLyricTime(time),
        content,
        id: parseInt(Math.random().toString().slice(-6))
      })
    }
  })
  lyric.value = lyricObjArr
}

/* 根据歌曲id, 获取歌曲详情 */
const detailSong = async (id: number) => {
  const res: any = await getSongDetail(id)
  const { songs } = res
  detail.value = songs[0]
}

/* Top-area 下拉按钮的点击事件处理 */
const handleClickSlideDown = (): void => {
  router.go(-1)
}

/* 播放/暂停按钮的点击事件处理 */
const handlePlay = (): void => {
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
const handleAudioEnded = (): void => {
  isPlaying.value = false
  dtCountDown.value.reset()
  currentPercentage.value = 0
  lyricContent.value.style.transform = `translateY(0px)`
  lyricScrollHeight = 0
  activeLyricIndex = 0
  refActiveLyricIndex.value = 0
}

/* 歌曲加载完毕后的事件监听 */
const handleLoaded = (): void => {
  duration.value = audio.value.duration
  lyricScrollHeight = 0
}

/* 歌曲当前播放时间变化时的事件监听 */
const handleAudioTimeUpdate = (): void => {
  const { currentTime } = audio.value || 0
  if (currentTime) {
    handleLyricScroll(currentTime)
    currentPercentage.value = Math.round(currentTime / duration.value * 100)
  }
}

/* 封面/歌词切换的点击事件处理 */
const handleSwitch = (): void => {
  showCover.value = !showCover.value
}

/* 歌词时间的格式化 ('XX:XX.XXX' -> 00.000) */
const formatLyricTime = (time: string): number => {
  let min = Number(time.split(':')[0])
  let second = Number(time.split(':')[1])
  return Number((min * 60 + second).toFixed(3))
}

/* 歌词滚动 */
const handleLyricScroll = (currentTime: number) => {
  if (activeLyricIndex >= lyric.value.length) {
    return
  }

  lyricDivHeight = lyricDiv.value.offsetHeight / 2 // 获取歌词外层固定高度容器的高度
  const lyricItem: LyricItem = lyric.value[activeLyricIndex] // 当前的高亮歌词
  if (currentTime > lyricItem.time) {
    const lyricDomArr = lyricContent.value.querySelectorAll('.lyric-item') // 歌词dom元素数组
    const index = parseInt(lyricDomArr[activeLyricIndex].dataset.index)
    if (activeLyricIndex === index) {
      refActiveLyricIndex.value = activeLyricIndex
      activeLyricIndex ++
      if (activeLyricIndex >= lyric.value.length) {
        return
      }
      lyricScrollHeight += lyricDomArr[activeLyricIndex].offsetHeight
      lyricContent.value.style.transform = `translateY(${lyricDivHeight - lyricScrollHeight}px)`
    }
  }
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
      height: 300px;
      border-radius: 10px;
      box-shadow: 0 4px 12px 0 rgba(128, 128, 128, 0.382);
      :deep(.van-image__img) {
        border-radius: 10px;
      }
    }
    .lyric {
      width: 300px;
      height: 300px;
      overflow: hidden;
      font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      .lyric-container {
        overflow: auto;
      }
      .active-lyric {
        color: #f2f2f2;
        zoom: 1.2;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
      }
      .inactive-lyric {
        color: transparent;
        transition: all 0.2s ease-in-out;
        text-shadow: 1px 1px 2px #d2d2d2;
      }
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
    width: 300px;
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
    .cover-area {
      .cover, .lyric {
        width: 240px;
        height: 240px;
      }
    }
    .name-area {
      max-width: 250px;
    }
    .progress-area {
      width: 240px;
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
