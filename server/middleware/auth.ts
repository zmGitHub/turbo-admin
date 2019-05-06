import { Context } from 'koa'
import axios from 'axios'
import request from '../services/request'

// 权限验证和用户区分(商家和 admin)
export default async (ctx:Context, next: () => void) => {
  const cookie:String = ctx.cookies.get('msid')
  if (!cookie) {
    ctx.throw(401, '用户登录过期', { code: -1 })
  } else {
    console.log('权限验证')
    axios.defaults.headers['Cookie'] = `msid=${cookie}; `
    const { session } = ctx.app.context
    if (!session) {
      const res = await request.get('/api/user/current')
      ctx.app.context.session = res
    }
    await next()
  }
}
