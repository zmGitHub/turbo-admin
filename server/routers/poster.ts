import * as Router from 'koa-router'
import auth from '../middleware/auth'
import poster from '../controllers/poster'

const router:Router = new Router()

router.get('/get/:id', poster.getPoser)
router.get('/query', poster.getPosterList)
router.post('/add', auth, poster.addPoster)
router.put('/update', auth, poster.updatePoster)

export default router
