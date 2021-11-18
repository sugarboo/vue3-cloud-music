/* 歌手列表api - 请求参数 */
export interface ListQuery {
  type: number
  area: number
  limit: number
  offset: number
}

/* 歌手列表 - 歌手 */
export interface Artist {
  id: number
  picUrl: string
  name: string
  trans?: string
}

/* 歌手详情 */
export interface ArtistDetail {
  artist: {
    name: string // 歌手姓名
    cover: string // 歌手图片
    transNames?: Array<string> // 歌手译名
    identities?: Array<string>
    badgeField?: number
    briefDesc: string
    musicSize: number
    albumSize: number
    mvSize: number
  }
  identify?: {
    imageDesc: string
  }
}

/* 歌手详情 - 歌曲列表api请求参数 */
export interface SongsListQuery {
  id: number
  limit: number
  order: string | null
  offset: number
}

/* 歌手详情 - 歌曲 */
export interface SongItem {
  id: number
  name: string
  ar: Array<SongsAr>
}

/* 歌手详情 - 歌曲参与者 */
export interface SongsAr {
  id: number
  name: string
}

/* 歌手详情 - 专辑列表api请求参数 */
export interface AlbumsListQuery {
  id: number
  offset: number
}

/* 歌手详情 - 专辑 */
export interface AlbumItem {
  id: number
  name: string
  blurPicUrl: string
  publishTime: string
}