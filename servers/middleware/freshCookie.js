"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
// 根据每次请求的 cookie获取最新的用户信息
exports.default = async (ctx, next) => {
    const cookie = ctx.cookies.get('msid');
    axios_1.default.defaults.headers['Cookie'] = `msid=${cookie}; `;
    console.log('数据刷新');
    await next();
};
//# sourceMappingURL=freshCookie.js.map