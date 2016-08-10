// 项目基本配置参数
import path from 'path';
import _debug from 'debug';
import {
  argv
} from 'yargs';
import ip from 'ip';

const localip = ip.address();
const debug = _debug('app:config');
const error = _debug('app:error');
const info = _debug('app:info');

info('👾 加载默认配置...');
// ========================================================
// 基本配置
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // 目录结构
  // path_base ----> 根目录
  // dir_clent ----> 源代码目录
  // dir_dist  ----> 打包生成目录
  // dir_server----> 服务器目录
  // dir_test  ----> 测试目录
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // 服务器设置
  // ----------------------------------
  server_host: localip, // 获取本机真实 IP 地址方便夸机器访问
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // 打包配置
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  // 第三方库: 打包列表,后期要手动加上,打包到 vendor.js
  compiler_vendor: [
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'whatwg-fetch'
  ],

  // ----------------------------------
  // 测试配置
  // ----------------------------------
  coverage_reporters: [{
    type: 'text-summary'
  }, {
    type: 'lcov',
    dir: 'coverage'
  }]
};


// ------------------------------------
// 全局环境变量
// ------------------------------------
// 改变这里的环境变量请同时配置 ~/.eslintrc 里面的globals属性
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__COVERAGE__': !argv.watch && config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// 验证第三方依赖包
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    // 如果依赖正常返回
    if (pkg.dependencies[dep]) return true;
    error(`"${dep}" 在 package.json 中未配置: 将不会打包到 vendor.js, 请在compiler_vendor中删除该依赖...`);
  });

// ------------------------------------
// 获取基本路径 utility
// ------------------------------------
const resolve = path.resolve;
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args]);

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
};

// ========================================================
// 加载自定义环境变量
// ========================================================
info(`根据 "${config.env}" 来决定运行的配置参数`);
const environments = require('./environments').default;
const overrides = environments[config.env];
if (overrides) {
  debug('覆盖默认配置运行...');
  Object.assign(config, overrides(config));
} else {
  debug('默认配置运行...');
}

export default config;
