/**
 * wepack 开发环境配置
*/

const Webpack = require('webpack')
const merge = require('webpack-merge')
// 优化 webpack 输出信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const uitls = require('./koa/utils')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {
  devtool: '#cheap-module-source-map',
  mode: 'development',
  stats: { children: false },
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=false', uitls.resolve('src/index.js')]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    // 全局开启代码热替换
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
})

module.exports = config
