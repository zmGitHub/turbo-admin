import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  timeout: 8000
})

// 错误处理拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  return data || { code: 200 };
}, (error) => {
  let info = { code: -1, message: '系统错误' };
  if (error.response) {
    const { data, status } = error.response;
    if (status === 401) {
      message.error('用户未登录, 请登录!');
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
