"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const design_1 = require("./design");
const hisense_1 = require("./hisense");
const router = new Router({
    prefix: '/api',
});
router.use('/hisense', hisense_1.default.routes(), hisense_1.default.allowedMethods());
router.use('/design', design_1.default.routes(), design_1.default.allowedMethods());
exports.default = router;
//# sourceMappingURL=index.js.map