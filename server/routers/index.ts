import * as Router from 'koa-router'
import design from './design'
import hisense from './hisense'

const router:Router = new Router({
  prefix: '/api',
})
router.use('/hisense', hisense.routes(), hisense.allowedMethods())
router.use('/design', design.routes(), design.allowedMethods())

export default router
