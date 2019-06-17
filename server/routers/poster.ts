import * as Router from 'koa-router'
import auth from '../middleware/auth'
import poster from '../controllers/poster'

const router:Router = new Router()

router.get('/get/:id', poster.getPoser)
router.get('/query', poster.getPosterList)
router.post('/add', auth, poster.addPoster)
router.post('/publish', auth, poster.publishPoster)
router.put('/update', auth, poster.updatePoster)
router.delete('/delete/:id', auth, poster.delete)
router.get('/publish', poster.getShopPublish)
router.get('/publish/o2o', poster.getO2oPublish)

export default router
