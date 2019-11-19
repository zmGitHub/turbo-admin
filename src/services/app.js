import request from '@/utils/request'

// 检测用户登录状况
export async function getUserLoginStatus() {
  return request.get('/api/hisense/hasLogin')
}

// 获取 csrftoken
export async function getCSRFToken() {
  return request.get('/api/hisense/csrf')
}

// 是否登录
export async function hasLogin() {
  return request.post('/auth-api/login', {"acctName":"admin","acctPwd":"MTExMTEx"})
}

// 添加装修组件的权限列表
export async function updateComponentAuth(params) {
  return request.post('/api/design/auth', params)
}
