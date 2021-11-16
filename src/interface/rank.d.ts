import { Ar, Al } from './index'

export interface RankItem {
  id: number
  name: string
  coverImgUrl: string
  description?: string
}

export interface RankDetail {
  id: number
  name: string
  coverImgUrl: string
  tracks: Array<Track>
}

export interface Track {
  id: number
  name: string
  ar: Array<Ar>
  artists: Array<Ar>
  al: Al,
  album: Al
}
