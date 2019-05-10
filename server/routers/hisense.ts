import { Context } from 'koa'
import * as Router from 'koa-router'
import request from '../services/request'
import freshCookie from '../middleware/freshCookie'

const router: Router = new Router()

router.get('/csrf', async (ctx: Context) => {
  const result = await request.get('/api/get-csrf')
  ctx.status = 200
  ctx.body = result
})

// 获取当前的用户信息
router.get('/user', freshCookie, async (ctx: Context) => {
  const res = await request.get('/api/user/current')
  ctx.status = 200
  ctx.body = res
})

export default router
