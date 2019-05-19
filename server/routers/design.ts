import * as Router from 'koa-router'
import auth from '../middleware/auth'
import design from '../controllers/design'
import setting from '../controllers/setting'

const router:Router = new Router()

// 根据装修 id 获取数据
router.get('/find/:id', auth, design.getById)
// 获取发布中的数据
router.get('/timing', auth, design.getTiming)
// 获取首页模板
router.get('/home', auth, design.getHome)
// 获取商家首页模板
router.get('/home/o2o', auth, design.getO2o)
// 商家更新数据
router.put('/home/o2o', auth, design.updateO2o)
// 获取装修数据列表
router.get('/paging', auth, design.queryDesign)
// 添加装修数据
router.post('/add', auth, design.addDesign)
// 修改装修数据
router.put('/update', auth, design.update)
// admin 发布装修数据
router.post('/publish/admin', auth, design.publishAdmin)
// o2o 发布装修数据
router.post('/publish/o2o', auth, design.publishO2o)
// 获取历史数据
router.get('/history', auth, design.getHistory)
// 商家拒绝应用模板
router.post('/reject', auth, design.reject)
// 获取组件权限
router.get('/auth', auth, setting.getComponentAuth)
// 添加组件权限
router.post('/auth', auth, setting.updateComponentAuth)

export default router
