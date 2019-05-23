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

// 通用装修数据
router.post('/service-data', freshCookie, async (ctx: Context) => {
  const { body } = ctx.request
  const res = await request.post(`/design/component/service-data?path=${body.path}`, body)
  ctx.status = 200
  ctx.body = res
})

// 图片通用接口
router.get('/images/category', freshCookie, async (ctx: Context) => {
  const params = ctx.query
  const res = await request.get('/api/design/resourceCategory/list', { params })
  ctx.status = 200
  ctx.body = res
})

// 图片分类接口
router.get('/images/list', freshCookie, async (ctx: Context) => {
  const params = ctx.query
  const res = await request.get('/api/design/image/list', { params })
  ctx.status = 200
  ctx.body = res
})

// 前台分类
router.get('/category/children', freshCookie, async (ctx: Context) => {
  const params = ctx.query
  const res = await request.get('/api/frontCategories/childrenTree', { params })
  ctx.status = 200
  ctx.body = res
})

router.get('/article/:id', freshCookie, async (ctx: Context) => {
  const { id } = ctx.params
  const res = await request.get(`/api/hisense/article/${id}`)
  ctx.status = 200
  ctx.body = res
})

router.get('/article/menu/listMenuInfo', freshCookie, async (ctx: Context) => {
  const { menuIds } = ctx.query
  const res = await request.get('/api/hisense/article/menu/listMenuInfo', { params: { menuIds } })
  ctx.status = 200
  ctx.body = res
})

router.get('/promotion/seckill/shows', freshCookie, async (ctx: Context) => {
  const { times, channel } = ctx.query
  const res = await request.get('/api/hisense/seckill-promotion/shows/current', {
    params: { times, channel },
  })
  ctx.status = 200
  ctx.body = res
})

export default router
