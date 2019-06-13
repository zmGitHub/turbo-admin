import { Context } from 'koa'
import axios from 'axios'

// 根据每次请求的 cookie获取最新的用户信息
export default async (ctx:Context, next: () => void) => {
  const cookie:String = ctx.cookies.get('msid')
  const csrf:String = ctx.cookies.get('x-csrf-token')
  console.log('csrf', csrf)
  console.log('cookie', cookie)
  if (cookie) {
    axios.defaults.headers['Cookie'] = `msid=${cookie}; `
  }
  if (csrf) {
    axios.defaults.headers['x-csrf-token'] = csrf
  }
  await next()
}
