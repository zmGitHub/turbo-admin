import request from '@/utils/request'

// 创建装修数据
export async function createDesignData(params) {
  return request.post('/api/hisense/applet/design/create', params)
}

export async function queryDesignData(params) {
  return request.get('/api/hisense/applet/design/paging', { params })
}
