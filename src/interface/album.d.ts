import { Ar } from './index'

export interface AlbumDetail {
  name: string
  blurPicUrl: string
  picUrl?: string
  description: string
  publishTime: string
  company?: string
  artist: {
    name: string
  }
}

export interface SongItem {
  id: number
  name: string
  ar: Array<Ar>
}