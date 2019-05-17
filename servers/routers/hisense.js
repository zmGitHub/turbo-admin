"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const request_1 = require("../services/request");
const freshCookie_1 = require("../middleware/freshCookie");
const router = new Router();
router.get('/csrf', async (ctx) => {
    const result = await request_1.default.get('/api/get-csrf');
    ctx.status = 200;
    ctx.body = result;
});
// 获取当前的用户信息
router.get('/user', freshCookie_1.default, async (ctx) => {
    const res = await request_1.default.get('/api/user/current');
    ctx.status = 200;
    ctx.body = res;
});
exports.default = router;
//# sourceMappingURL=hisense.js.map