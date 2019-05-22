import request from '@/utils/request'

// 获取图片分类
export async function queryImageCategory() {
  return request.get('/api/hisense/images/category?siteId=1')
}
// 获取图片分类
export async function queryImageList(params) {
  return request.get('/api/hisense/images/list', { params })
}

// 获取类目 id
export async function getCategory(params) {
  return request.get('/api/hisense/category/children', { params })
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
  return request.post('/api/hisense/service-data', params)
  // return request.post(`/design/component/service-data?path=${params.path}`, params)
}

// 获取整点秒杀
export async function getSeckillData(params) {
  return request.get('/api/hisense/seckill-promotion/shows/current', { params })
}
