/* 歌手 */
export interface Ar {
  id: number
  name: string
}

/* 专辑 */
export interface Al {
  id: number
  name: string
  picUrl: string
  artist?: {
    name: string
  }
}

/* 歌曲 */
export interface Song {
  id: number
  name: string
  artists: Array<Ar>
}