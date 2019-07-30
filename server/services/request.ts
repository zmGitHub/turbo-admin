import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://m.test.shop.hisense.com',
  xsrfCookieName: 'x-csrf-token',
  timeout: 5000,
})

// 错误处理拦截器
instance.interceptors.response.use(
  (response) => {
    const { data, headers } = response
    const cookies = headers['set-cookie'] || headers['Set-Cookie']
    if (cookies) {
      data.cookie = cookies
    }
    return data
  },
  (error) => {
    const info = { error, code: -1, message: '系统错误' }
    return Promise.reject(info)
  })

export default instance
