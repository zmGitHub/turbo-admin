const Webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.config.base')
const uitls = require('./koa/utils')

const config = merge(baseConfig, {
  mode: 'production',
  entry: {
    index: uitls.resolve('src/index.js')
  },
  output: {
    filename: '[name].[chunkhash:9].js',
    // 异步模块文件名
    chunkFilename: '[name].[chunkhash:9].js',
    globalObject: 'this',
    path: path.resolve(__dirname, '../apps/dist/wechat'),
    publicPath: '/wechat/'
  },
  plugins: [
    // 分离css文件
    new ExtractCssChunks({
      filename: 'css/[name].[chunkhash:9].css',
      chunkFilename: 'css/[id].[chunkhash:9].css',
    }),
    // 限制文件最小KB
    new Webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 20000
    }),
    new OptimizeCssAssetsPlugin(
      {
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          // postcss那边已经处理过autoprefixer了，这里把它关掉，否则会导致浏览器前缀兼容范围问题
          autoprefixer: false,
          discardComments: { removeAll: true }
        },
      }
    ),
  ],
  /**
   * production模式下，将侧重于模块体积优化和线上部署，
   * 包含如下内容： 开启所有的优化代码 更小的bundle大小
   * 去除掉只在开发阶段运行的代码 Scope hoisting和Tree-shaking
   * 自动启用uglifyjs对代码进行压缩
   */
  optimization: {
    minimize: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: "async",
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 1, // 模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, // 入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: 'all',
        }
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: true,
            dead_code: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: true,
        },
        parallel: true,
        sourceMap: false,
      }),
    ],
  }
})

module.exports = config
