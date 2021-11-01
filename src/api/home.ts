import request from '@/utils/request.ts'

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
