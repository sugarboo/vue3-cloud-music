/* 首页 - 轮播图 */
export interface Banner {
  imageUrl: string, // 轮播图url
  titleColor: string, // 轮播图标签颜色
  typeTitle: string // 轮播图标签标题
}

/* 首页 - 歌曲 */
export interface SongItem {
  id: number
  name: string
  artists: Array<{
    name: string
  }>
  album: {
    blurPicUrl: string
  }
}