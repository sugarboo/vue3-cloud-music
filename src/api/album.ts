import request from '@/utils/request'

/* 根据id获取专辑详情数据 */
export function getAlbumDetail(query: number) {
  return request({
    url: '/album',
    method: 'GET',
    params: { id: query }
  })
}
