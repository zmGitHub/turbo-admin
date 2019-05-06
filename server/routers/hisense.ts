import { Context } from 'koa'
import * as Router from 'koa-router'
import request from '../services/request'

const router: Router = new Router()

router.get('/csrf', async (ctx: Context) => {
  const result = await request.get('/api/get-csrf')
  console.log(result)
  ctx.status = 200
  ctx.state.test = 2134234
  ctx.body = result
})

export default router
