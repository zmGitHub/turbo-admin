import * as Router from 'koa-router'
import design from './design'
import poster from './poster'
import hisense from './hisense'

const router:Router = new Router({
  prefix: '/wechat/api',
})
router.use('/hisense', hisense.routes(), hisense.allowedMethods())
router.use('/design', design.routes(), design.allowedMethods())
router.use('/poster', poster.routes(), poster.allowedMethods())

export default router
