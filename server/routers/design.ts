import * as Router from 'koa-router'
import auth from '../middleware/auth'
import dataFilter from '../middleware/channel-filter'
import design from '../controllers/design'

const router:Router = new Router()
// 根据类型获取发布的数据
router.get('/publish', design.getPublishData)
// 根据装修 id 获取数据
router.get('/find/:id', design.getById, dataFilter)
// 装修系统获取数据
router.get('/edit/:id', design.getDesignById)
// 根据 path 获取装修数据
router.get('/path', design.getByPath)
// o2o 根据 path 获取装修数据
router.get('/path/o2o', design.getO2oByPath)
// 获取发布中的数据
router.get('/timing', auth, design.getTiming)
// 获取首页模板
router.get('/home', design.getHome)
// 获取商家首页模板
router.get('/home/o2o', design.getO2o)
// 商家更新数据
router.put('/home/o2o', auth, design.updateO2o)
// 获取装修数据列表
router.get('/paging', auth, design.queryDesign)
// 添加装修数据
router.post('/add', auth, design.addDesign)
// 修改装修数据
router.put('/update', auth, design.update)
// 删除
router.delete('/delete/:id', auth, design.delete)
// admin 发布装修数据
router.post('/publish/admin', auth, design.publishAdmin)
// o2o 发布装修数据
router.post('/publish/o2o', auth, design.publishO2o)
// 获取历史数据
router.get('/history', auth, design.getHistory)
// 商家拒绝应用模板
router.post('/reject', auth, design.reject)

export default router
