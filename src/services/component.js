import request from '@/utils/request'

// 获取图片分类
export async function queryImageCategory() {
  return request.get('/api/design/resourceCategory/list?siteId=1')
}
// 获取图片分类
export async function queryImageList(params) {
  return request.get('/api/design/image/list', { params })
}

// 获取消息列表
export async function queryNoticeList(params) {
  return request.post(`/design/component/service-data?path=${params.path}`, params)
}
