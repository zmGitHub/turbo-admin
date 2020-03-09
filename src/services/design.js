import request from '@/utils/request'

// 创建装修数据
export async function createDesignData(params) {
  return request.post('/api/design/add', params)
}

// 更新装修数据
export async function updateDesignData(params) {
  return request.put('/api/design/update', params)
}

// 更新商家装修数据
export async function updateO2oData(params) {
  return request.put('/api/design/home/o2o', params)
}

// 查询装修数据
export async function queryDesignData(params) {
  return request.get('/api/design/paging', { params })
}

// admin立即发布/定时发布
export async function publishAdmin(params) {
  return request.post('/api/design/publish/admin', params)
}

// admin立即发布/定时发布
export async function publishO2o(params) {
  return request.post('/api/design/publish/o2o', params)
}

// 取消发布
export async function cancelPublish(id) {
  return request.post(`/api/hisense/applet/design/publish/cancel/${id}`)
}

// 删除模板
export async function deleteDesignData(id) {
  return request.delete(`/api/design/delete/${id}`)
}


// 根据 id 获取装修数据
export async function getDesignDataById(params) {
  return request.get(`/api/design/edit/${params.id}`)
}

// 根据店铺 id 获取对应店铺下的装修数据
export async function getPublishDataByShopId(params) {
  return request.get('/api/design/home/o2o/edit', { params })
}


// 根据 id 获取装修数据
export async function getShopHistory(params) {
  return request.get('/api/design/history', { params })
}

// 获取发布中的模板 PS: 强制只有一个
export async function getTiming() {
  return request.get('/api/design/timing')
}


// 商家拒绝
export async function rejectDesignData(params) {
  return request.post('/api/design/reject', params)
}
