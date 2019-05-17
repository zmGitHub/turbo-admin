"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const instance = axios_1.default.create({
    baseURL: 'http://m.test.shop.hisense.com',
    // xsrfCookieName: 'x-csrf-token',
    timeout: 5000,
});
// 错误处理拦截器
instance.interceptors.response.use((response) => {
    const { data } = response;
    return data;
}, (error) => {
    const info = { error, code: -1, message: '系统错误' };
    return Promise.reject(info);
});
exports.default = instance;
//# sourceMappingURL=request.js.map