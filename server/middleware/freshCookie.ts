import { Context } from 'koa'
import axios from 'axios'

// 根据每次请求的 cookie获取最新的用户信息
export default async (ctx:Context, next: () => void) => {
  const cookie:String = ctx.cookies.get('msid')
  axios.defaults.headers['Cookie'] = `msid=${cookie}; `
  axios.defaults.headers['x-csrf-token'] = ctx.request.headers['x-xsrf-token']
  await next()
}
