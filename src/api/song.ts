import request from '@/utils/request'

/* 根据id获取音乐url */
export function getSongUrl(query: number) {
  return request({
    url: '/song/url',
    method: 'GET',
    params: { 
      id: query,
      // br: 999000
    }
  })
}

/* 根据id获取音乐歌词 */
export function getSongLyric(query: number) {
  return request({
    url: '/lyric',
    method: 'GET',
    params: { id: query }
  })
}

/* 根据id获取歌曲详情 */
export function getSongDetail(query: number) {
  return request({
    url: '/song/detail',
    method: 'GET',
    params: { ids: query }
  })
}
