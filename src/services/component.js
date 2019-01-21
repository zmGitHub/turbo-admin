import request from '@/utils/request'

// 获取图片分类
export async function queryImageCategory() {
  return request.get('/api/design/resourceCategory/list?siteId=1')
}
// 获取图片分类
export async function queryImageList(params) {
  return request.get('/api/design/image/list', { params })
}
