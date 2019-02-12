import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  xsrfCookieName: 'x-csrf-token',
  timeout: 8000
})

// 错误处理拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  return data || { code: 200 };
}, (error) => {
  let info = { code: -1, message: '系统错误' };
  console.log(error)
  if (error.response) {
    const { data, status } = error.response;
    // 如果用户未授权这个时候回自动跳转
    if (status === 401 || status === 404) {
      message.error('用户未登录!');
    } else {
      // 错误处理返回
      info = data;
      message.error(data.message || '系统错误');
    }
  } else {
    // 网络错误
    message.error('网络错误!');
  }

  return Promise.reject(info);
});

export default instance
