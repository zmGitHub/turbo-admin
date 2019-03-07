import request from '@/utils/request'

// 获取 csrftoken
export async function getCSRFToken(params) {
  return request.get('/api/get-csrf', params)
}
// 创建装修数据
export async function createDesignData(params) {
  return request.post('/api/hisense/applet/design/create', params)
}

// 发布装修
export async function publishDesign(params) {
  return request.post('/api/hisense/applet/design/create', params)
}

// update
// 更新基本信息 name
export async function updateDesginBasic(params) {
  return request.post('/api/hisense/applet/design/update', params)
}

// 更新装修数据
export async function updateDesginData(params) {
  return request.post('/api/hisense/applet/design/save', params)
}

// 查询装修数据
export async function queryDesignData(params) {
  return request.get('/api/hisense/applet/design/paging', { params })
}

// 立即发布/定时发布
export async function publishDesignData(params) {
  return request.post('/api/hisense/applet/design/publish', params)
}

// 取消发布
export async function cancelPublish(id) {
  return request.post(`/api/hisense/applet/design/publish/cancel/${id}`)
}

// 删除模板
export async function deleteDesignData(id) {
  return request.delete(`/api/hisense/applet/design/delete/${id}`)
}

// 设置默认模板
export async function setDefaultDesignData(id) {
  return request.post(`/api/hisense/applet/design/default/${id}`)
}


// 根据 id 获取装修数据
export async function getDesignDataById(params) {
  return request.get(`/api/hisense/applet/design/find/save/${params.id}`)
}
