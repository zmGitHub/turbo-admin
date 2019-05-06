import * as Router from 'koa-router'

import categories from './categories'

const router:Router = new Router()

router.use('/api', categories.routes(), categories.allowedMethods())

export default router
