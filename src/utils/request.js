import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  baseURL: '/wechat',
  xsrfCookieName: 'x-csrf-token',
  timeout: 10000
})

// 错误处理拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  return data || { code: 200 };
}, (error) => {
  let info = { code: -1, message: '系统错误' };
  if (error.response) {
    const { status, data } = error.response;
    // 如果用户未授权这个时候回自动跳转
    switch (status) {
      case 401:
        info = { code: 401, message: '用户未登录' };
        break;
      case 404:
        info = { code: 404, message: 'API 不存在' };
        break;
      case 500:
        info = { code: 500, message: data.msg || '服务器错误' };
        break;
      default:
        break;
    }
    message.error(info.message)
  } else {
    // 网络错误
    message.error('网络错误!');
  }

  return Promise.reject(info);
});

export default instance
