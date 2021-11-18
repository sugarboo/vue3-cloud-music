import { Ar, Al } from './index'

/* 歌曲详情 */
export interface SongDetail {
  name: string
  ar: Array<Ar>
  al: Al
}
