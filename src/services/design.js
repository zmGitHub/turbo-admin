import request from '@/utils/request'

// 创建装修数据
export async function createDesignData(params) {
  return request.post('/api/hisense/applet/design/create', params)
}
// 查询装修数据
export async function queryDesignData(params) {
  return request.get('/api/hisense/applet/design/paging', { params })
}

// 立即发布/定时发布
export async function publishDesignData(params) {
  return request.post('/api/hisense/applet/design/publish', params)
}

// 删除模板
export async function deleteDesignData(id) {
  return request.delete(`/api/hisense/applet/design/delete/${id}`)
}
