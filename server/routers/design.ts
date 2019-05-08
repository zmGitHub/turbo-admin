import * as Router from 'koa-router'
import auth from '../middleware/auth'
import design from '../controllers/design'

const router:Router = new Router()

router.get('/:id', auth, design.getById)
router.get('/paging', auth, design.queryDesign)
router.post('/add', auth, design.addDesign)

export default router
