import { BaseContext } from 'koa'
import * as Router from 'koa-router'
import auth from '../middleware/auth'
import categories from './categories'
import hisense from './hisense'

const router:Router = new Router({
  prefix: '/api',
})
// 权限拦截
router.use(auth)
router.use('/hisense', hisense.routes(), hisense.allowedMethods())
router.use('/category', categories.routes(), categories.allowedMethods())

export default router
