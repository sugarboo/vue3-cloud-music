import request from '@/utils/request'

import { queryProps } from '@/interface/artists'

/* 歌手页 - 歌手列表 */
export function getArtistsList(query: queryProps) {
  return request({
    url: '/artist/list',
    method: 'GET',
    params: query
  })
}
