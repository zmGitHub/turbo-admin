import { Context } from 'koa'
import * as Router from 'koa-router'
import axios from 'axios'
import request from '../services/request'

const router: Router = new Router()

router.get('/csrf', async (ctx: Context) => {
  const result = await request.get('/api/get-csrf')
  ctx.status = 200
  ctx.body = result
})

// 获取当前的用户信息
router.get('/user', async (ctx: Context) => {
  const cookie:String = ctx.cookies.get('msid')
  if (!cookie) {
    ctx.throw(401, '用户登录过期', { code: -1 })
  } else {
    axios.defaults.headers['Cookie'] = `msid=${cookie}; `
    const { session } = ctx.app.context
    ctx.status = 200
    let userInfo = session
    if (!session) {
      const res = await request.get('/api/user/current')
      ctx.app.context.session = res
      userInfo = res
    }
    ctx.body = userInfo
  }
})

export default router
