<template>
  <div class="component-container">
    <div class="search-bar-wrap">
      <van-search
        shape="round"
        clearable
        input-align="center"
        placeholder="搜索音乐、视频、播客、歌词"
        background="#dd001b"
        :disabled="true"
        @click="handleClickSearchBar"
      ></van-search>
    </div>

    <!-- 搜索弹出层 -->
    <van-popup v-model:show="show" round position="top" @close="handleClosePopup">
      <div class="popup-wrap">
        <div class="search-area">
          <van-search
            v-model="keywords"
            shape="round"
            clearable
            input-align="center"
            placeholder="搜索音乐、视频、播客、歌词"
            @update:model-value="listSearchSuggest"
            @clear="handleClearSearchBar"
          >
          </van-search>
          <div class="suggest-area" v-if="hasSuggest">
            <div class="songs" v-show="searchSuggestSongs !== undefined && searchSuggestSongs.length">
            <div class="suggest-title">
              <span class="iconfont icon-sifenyinfu"></span>
              <span>单曲</span>
            </div>
              <van-list>
                <van-cell class="single-line" v-for="item in searchSuggestSongs" :key="item.id" is-link @click="handlePlaySong(item.id)">
                  <span>{{ item.name }}</span>
                  <span> - </span>
                  <span v-for="(artistItem, artistIndex) in item.artists" :key="artistItem.id">
                    <span>{{ artistItem.name }}</span>
                    <span v-if="artistIndex !== item.artists.length - 1"> / </span>
                  </span>
                </van-cell>
              </van-list>
            </div>
            <div class="artists" v-show="searchSuggestArtists !== undefined && searchSuggestArtists.length">
              <div class="suggest-title">
                <span class="iconfont icon-mic"></span>
                <span>歌手</span>
              </div>
              <van-list>
                <van-cell class="single-line" v-for="item in searchSuggestArtists" :key="item.id" is-link @click="handleClickSearchArtist(item.id)">
                  <span>{{ item.name }}</span>
                </van-cell>
              </van-list>
            </div>
            <div class="albums" v-show="searchSuggestAlbums !== undefined && searchSuggestAlbums.length">
              <div class="suggest-title">
                <span class="iconfont icon-album-line"></span>
                <span>专辑</span>
              </div>
              <van-list>
                <van-cell class="single-line" v-for="item in searchSuggestAlbums" :key="item.id" is-link @click="handleClickSearchAlbum(item.id)">
                  <span>{{ item.name }}</span>
                  <span> - </span>
                  <span>{{ item.artist ? item.artist.name : '' }}</span>
                </van-cell>
              </van-list>
            </div>
          </div>
        </div>
        <div class="category-area">
          <div class="category-item" @click="handleClickCategory('ArtistsList')">
            <van-button round>
              <span class="iconfont icon-mic"></span>
            </van-button>
            <span class="category-title">歌手</span>
          </div>
          <div class="category-item" @click="handleClickCategory('VideoList')">
            <van-button round>
              <span class="iconfont icon-video"></span>
            </van-button>
            <span class="category-title">视频</span>
          </div>
          <div class="category-item" @click="handleClickCategory('RankList')">
            <van-button round>
              <span class="iconfont icon-rank"></span>
            </van-button>
            <span class="category-title">排行榜</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getSearchSuggest } from '@/api/home'

import { Ar, Al, Song } from '@/interface/index'

const router = useRouter()

/* data */
const keywords = ref('')
const show = ref(false)
const hasSuggest = ref(false)
const searchSuggestAlbums = ref<Array<Al>>([])
const searchSuggestArtists = ref<Array<Ar>>([])
const searchSuggestSongs = ref<Array<Song>>([])

/* methods */
/* SearchBar的点击事件处理 */
const handleClickSearchBar = () => {
  show.value = true
}

/* SearchBar清除时的事件处理 */
const handleClearSearchBar = () => {
  hasSuggest.value = false
}

/* 搜索弹出层关闭时的事件处理 */
const handleClosePopup = () => {
  keywords.value = ''
  show.value = false
  hasSuggest.value = false
}

/* 获取搜索建议 */
const listSearchSuggest = async () => {
  const query = keywords.value
  if (query) {
    try {
      const res: any = await getSearchSuggest(query)
      const { albums, artists, songs } = res.result
      searchSuggestAlbums.value = albums
      searchSuggestArtists.value = artists
      searchSuggestSongs.value = songs && songs.length > 3 ? songs.slice(0, 3) : songs // 出于页面美观度考虑, 仅保留3条单曲搜索结果
      hasSuggest.value = true
    } catch (error) {
      hasSuggest.value = false
      console.log(error)
    }
  } else {
    hasSuggest.value = false
  }
}

/* 分类按钮(歌手 / 视频 / 排行榜)的点击事件处理  */
const handleClickCategory = (routerName: string) => {
  router.push({ name: routerName })
}

/* 搜索结果中的歌手点击事件处理 */
const handleClickSearchArtist = (id: number) => {
  router.push({
    name: 'ArtistDetail',
    query: { id }
  })
}

/* 搜索结果中的专辑点击事件处理 */
const handleClickSearchAlbum = (id: number) => {
  router.push({
    name: 'AlbumDetail',
    query: { id }
  })
}

/* 搜索结果中的单曲点击事件处理 - 跳转到歌曲播放页 */
const handlePlaySong = (id: number) => {
  router.push({
    name: 'SongPlayer',
    query: { id }
  })
}
</script>

<style lang="less" scoped>
.component-container {
  height: 100%;
  .search-bar-wrap {
    height: 100%;
  }
  .popup-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .search-area {
      height: 60px;
    }
    .suggest-area {
      .suggest-title {
        padding-left: 8px;
        height: 24px;
        line-height: 24px;
        color: #666666;
        font-size: 14px;
        font-weight: 600;
        background-color: #f5f5f7;
        .iconfont {
          margin-right: 4px;
        }
      }
    }

    .category-area {
      display: flex;
      justify-content: space-around;
      padding: 8px 0;
      .category-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        .van-button--default {
          background-color: #FFEBEE;
          border: 1px solid #FFEBEE;
        }
        .iconfont {
          color: #FF5252;
          font-weight: 600;
          font-size: 18px;
        }
         .category-title {
           font-size: 12px;
           color: #888888;
         }
      }
    }
  }
}

// 弹出层高度自适应
@media screen and (min-height: 568px) {
  :deep(.van-popup) {
    height: 88%;
  }
}

@media screen and (min-height: 667px) {
  :deep(.van-popup) {
    height: 80%;
  }
}

@media screen and (min-height: 736px) {
  :deep(.van-popup) {
    height: 72%;
  }
}

@media screen and (min-height: 812px) {
  :deep(.van-popup) {
    height: 66%;
  }
}

@media screen and (min-height: 1024px) {
  :deep(.van-popup) {
    height: 58%;
  }
}

@media screen and (min-height: 1366px) {
  :deep(.van-popup) {
    height: 50%;
  }
}

:deep(.van-search) {
  height: 100%;
}
</style>
