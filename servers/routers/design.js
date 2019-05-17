"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_1 = require("../middleware/auth");
const design_1 = require("../controllers/design");
const setting_1 = require("../controllers/setting");
const router = new Router();
// 根据装修 id 获取数据
router.get('/find/:id', auth_1.default, design_1.default.getById);
// 获取发布中的数据
router.get('/timing', auth_1.default, design_1.default.getTiming);
// 获取首页模板
router.get('/home', auth_1.default, design_1.default.getHome);
// 获取商家首页模板
router.get('/home/o2o', auth_1.default, design_1.default.getO2o);
// 商家更新数据
router.put('/home/o2o', auth_1.default, design_1.default.updateO2o);
// 获取装修数据列表
router.get('/paging', auth_1.default, design_1.default.queryDesign);
// 添加装修数据
router.post('/add', auth_1.default, design_1.default.addDesign);
// 修改装修数据
router.put('/update', auth_1.default, design_1.default.update);
// 发布装修数据
router.post('/publish', auth_1.default, design_1.default.publish);
// 获取历史数据
router.get('/history', auth_1.default, design_1.default.getHistory);
// 商家拒绝应用模板
router.post('/reject', auth_1.default, design_1.default.reject);
// 获取组件权限
router.get('/auth', auth_1.default, setting_1.default.getComponentAuth);
// 添加组件权限
router.post('/auth', auth_1.default, setting_1.default.updateComponentAuth);
exports.default = router;
//# sourceMappingURL=design.js.map