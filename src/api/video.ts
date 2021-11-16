import request from '@/utils/request'

/* 获取视频标签列表 */
export function getVideoGroupList() {
  return request({
    url: '/video/group/list',
    method: 'GET'
  })
}
