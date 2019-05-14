import * as Router from 'koa-router'
import auth from '../middleware/auth'
import design from '../controllers/design'

const router:Router = new Router()

// 根据装修 id 获取数据
router.get('/find/:id', auth, design.getById)
// 获取发布中的数据
router.get('/timing', auth, design.getTiming)
// 获取首页模板
router.get('/home', auth, design.getHome)
// 获取商家首页模板
router.get('/home/o2o', auth, design.getO2o)
// 获取装修数据列表
router.get('/paging', auth, design.queryDesign)
// 添加装修数据
router.post('/add', auth, design.addDesign)
// 获取历史数据
router.get('/history', auth, design.getHistory)

export default router
