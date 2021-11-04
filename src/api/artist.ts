import request from '@/utils/request'

import { queryProps } from '@/interface/artists'

/* 歌手列表页 - 获取歌手列表 */
export function getArtistsList(query: queryProps) {
  return request({
    url: '/artist/list',
    method: 'GET',
    params: query
  })
}

/* 歌手详情页 - 根据id获取歌手详情 */
export function getArtistDetail(query: number) {
  return request({
    url: '/artist/detail',
    method: 'GET',
    params: {
      id: query
    }
  })
}
