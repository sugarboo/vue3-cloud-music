import request from '@/utils/request'

import { ListQuery, SongsListQuery, AlbumsListQuery } from '@/interface/artists'

/* 歌手列表页 - 获取歌手列表 */
export function getArtistsList(query: ListQuery) {
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

/* 歌手详情页 - 根据id获取歌手歌曲列表 */
export function getArtistSongsList(query: SongsListQuery) {
  return request({
    url: '/artist/songs',
    method: 'GET',
    params: query
  })
}

/* 歌手详情页 - 根据id获取歌手专辑列表 */
export function getArtistAlbumsList(query: AlbumsListQuery) {
  return request({
    url: '/artist/album',
    method: 'GET',
    params: query
  })
}
