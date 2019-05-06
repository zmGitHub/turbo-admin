/**
 * 构建常用类
 */
const path = require('path')

export interface Config {
  resolve: Function,
  isDev: Boolean
}

const config: Config = {
  resolve: (dir:string) => path.join(__dirname, '..', dir),
  isDev: process.env.NODE_ENV === 'development',
}

export default config
