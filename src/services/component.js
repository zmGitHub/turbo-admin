import request from '@/utils/request'

// 获取图片分类
export async function queryImageCategory() {
  return request.get('/api/design/resourceCategory/list?siteId=1')
}
// 获取图片分类
export async function queryImageList(params) {
  return request.get('/api/design/image/list', { params })
}

// 获取文章
export async function getArticleById(id) {
  return request.get(`/api/hisense/article/${id}`)
}

// 获取资讯标题
export async function getMenuInfoById(menuIds) {
  return request.get('/api/hisense/article/menu/listMenuInfo', { params: { menuIds } })
}

// 获取装修数据
export async function getServiceData(params) {
  return request.post(`/design/component/service-data?path=${params.path}`, params)
}

