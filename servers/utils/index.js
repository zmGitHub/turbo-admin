"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 构建常用类
 */
const path = require('path');
const config = {
    resolve: (dir) => path.join(__dirname, '../../', dir),
    isDev: process.env.NODE_ENV === 'development',
};
exports.default = config;
//# sourceMappingURL=index.js.map