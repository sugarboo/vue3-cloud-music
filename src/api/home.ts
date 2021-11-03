import request from '@/utils/request'

/* 首页 - 轮播图列表 */
export function getBannersList() {
  return request({
    url: '/banner',
    method: 'GET'
  })
}

/* 首页 - 新歌速递 */
export function getNewSongList() {
  return request({
    url: '/top/song',
    method: 'GET'
  })
}

/* 首页 - 搜索建议 */
export function getSearchSuggest(query: string) {
  return request({
    url: '/search/suggest',
    method: 'GET',
    params: {
      keywords: query
    }
  })
}
