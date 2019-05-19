import request from '@/utils/request'

// 获取 csrftoken
export async function getCSRFToken() {
  return request.get('/api/hisense/csrf')
}

// 获取用户信息
export async function getUserInfo() {
  return request.get('/api/hisense/user')
}

// 添加装修组件的权限列表
export async function updateComponentAuth(params) {
  return request.post('/api/design/auth', params)
}
