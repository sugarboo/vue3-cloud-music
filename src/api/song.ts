import request from '@/utils/request'

/* 根据id获取音乐url */
export function getSongUrl(query: number) {
  return request({
    url: '/song/url',
    method: 'GET',
    params: { id: query }
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
