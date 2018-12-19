/**
 * 构建常用类
 */
const path = require('path')
// 获取相对路径
exports.resolve = dir => path.join(__dirname, '..', dir)

// 当前环境 dev/production
exports.isDev = () => process.env.NODE_ENV === 'development'
