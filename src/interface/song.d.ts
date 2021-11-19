import { Ar, Al } from './index'

/* 歌曲详情 */
export interface SongDetail {
  name: string
  ar: Array<Ar>
  al: Al
}

/* 歌词 */
export interface LyricItem {
  id: number
  time: number
  content: string
}
