import { Ar } from '@/interface/index'

/* 处理歌曲数据中的歌手数组的歌手名 */
export function formatArtistsNames(list: Array<Ar>): string {
  let names = ''
  list.forEach((item, index) => {
    names += index === list.length - 1 ? `${item.name}` : `${item.name} / `
  })
  return names
}

/* 时间戳格式化处理 */
export function formatUnixTime(time: string): string {
  return new Date(time).toLocaleString('chinese', { 'hour12': false }).split(' ')[0].split('/').join('-')
}
