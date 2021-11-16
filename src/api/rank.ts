import request from '@/utils/request'

/* 获取排行榜列表 */
export function getRankList() {
  return request({
    url: '/topList',
    method: 'GET'
  })
}

/* 根据歌单id获取排行榜歌单信息 */
export function getRankDetail(query: number) {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    params: { id: query }
  })
}
