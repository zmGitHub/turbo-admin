
const Webpack = require('webpack')
// 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// 分离 css
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
// lodash 处理
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// moment 处理
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')

const modifyVars = require('../src/styles/theme')


const uitls = require('./koa/utils')
const webpackConfig = require('../config').webpack

const cssLoaders = ['css-loader', 'postcss-loader']
const lessLoaders = ['css-loader', 'postcss-loader', {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    modifyVars,
    modules: true,
    javascriptEnabled: true
  },
}]
if (uitls.isDev()) {
  // production 打包 css 到独立的文件
  cssLoaders.unshift('style-loader')
  lessLoaders.unshift('style-loader')
} else {
  // production 打包 css 到独立的文件
  cssLoaders.unshift(ExtractCssChunks.loader)
  lessLoaders.unshift(ExtractCssChunks.loader)
}

// 基础配置
const config = {
  // 输出配置
  output: {
    path: uitls.resolve('dist'),
    // chunkFilename: '[name].bundle.js',
    publicPath: webpackConfig.publicPath // TODO: 切记和 deveServer 里面保持一致
  },
  resolve: {
    extensions: webpackConfig.extensions,
    alias: {
      '@': uitls.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: uitls.isDev(),
            plugins: [["import", {"libraryName": "antd", "libraryDirectory":"es", "style": true}]],
          },
        },
        include: uitls.resolve('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.less$/,
        use: lessLoaders
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(gif|jpg|jpeg|png|bmp|svg|ico)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:8].[ext]',
          },
        }],
      },
      // 字体文件 woff|woff2|eot|ttf
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 小于8912字节的文件,返回dataurl
            limit: 8912,
            // 生成的文件名,[name]为原始文件名,[hash:8]为根据文件内容生成8位md5值,[ext]为原始文件扩展名
            name: 'fonts/[name].[hash:8].[ext]',
          },
        }],
      },
    ]
  },
  plugins: [
    // TODO: 移动到 dev下处理
    new CaseSensitivePathsPlugin(),
    new Webpack.optimize.ModuleConcatenationPlugin(), // 启用作用域提升 让代码文件更小、运行的更快
    new HtmlWebpackPlugin({
      favicon: uitls.resolve('src/static/favicon.ico'),
      filename: 'index.html',
      template: uitls.resolve('src/index.html'),
      inject: true,
    }),
    new Webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    })
  ]
}

module.exports = config
