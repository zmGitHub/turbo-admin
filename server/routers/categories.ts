import * as Router from 'koa-router'
import category from '../controllers/category'

const router:Router = new Router({
  prefix: '/category',
})

router.get('/list', category.getCategory)
router.post('/add', category.addCategory)

export default router
