import request from '@/utils/request'

// 根据 id 获取poster
// 创建海报
export async function getPoster(id) {
  return request.get(`/api/poster/get/${id}`)
}

// 创建海报
export async function createPoster(params) {
  return request.post('/api/poster/add', params)
}

// 更新海报
export async function updatePoster(params) {
  return request.put('/api/poster/update', params)
}

// 删除海报
export async function removePoster(id) {
  return request.delete(`/api/poster/remove/${id}`)
}

// 获取海报列表
export async function queryPoster(params) {
  return request.get('/api/poster/query', { params })
}
