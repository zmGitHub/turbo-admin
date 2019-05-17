"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const routers_1 = require("./routers");
const utils_1 = require("./utils");
const app = new Koa();
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        console.log('系统错误');
        console.log(err);
        err.status = err.statusCode || err.status || 500;
        throw err;
    }
});
// 静态文件
app.use(koaStatic(utils_1.default.resolve('dist')));
// 请求数据解析
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
}));
// 路由
app.use(routers_1.default.routes());
app.use(routers_1.default.allowedMethods());
app.on('error', (err) => {
    console.error(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map