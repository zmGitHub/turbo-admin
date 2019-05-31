import request from '@/utils/request'

// 获取 csrftoken
export async function getCSRFToken() {
  return request.get('/api/hisense/csrf')
}

// 是否登录
export async function hasLogin() {
  let user = {}
  const loginStatus = await request.get('/api/hisense/hasLogin')
  if (loginStatus && loginStatus.isLogin) {
    const { id } = loginStatus.result
    const userInfo = await request.get(`/api/hisense/user/${id}`)
    if (userInfo && userInfo.id) {
      const { extra, roles } = userInfo
      user = { id, shopId: extra.o2oShopId, roles }
    }
  }
  return user
}

// 添加装修组件的权限列表
export async function updateComponentAuth(params) {
  return request.post('/api/design/auth', params)
}
