import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://m.hisense.com',
  xsrfCookieName: 'x-csrf-token',
  timeout: 5000,
})

// 错误处理拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    const info = { error, code: -1, message: '系统错误' }
    return Promise.reject(info)
  })

export default instance
