import request from '@/utils/request'

// 获取 csrftoken
export async function getCSRFToken() {
  return request.get('/api/hisense/csrf')
}

// 获取用户信息
export async function getUserInfo() {
  return request.get('/api/hisense/user')
}
