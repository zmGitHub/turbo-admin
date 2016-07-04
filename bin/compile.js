import fs from 'fs-extra';
import _debug from 'debug';
import webpackCompiler from '../build/webpack-compiler';
import webpackConfig from '../build/webpack.config';
import config from '../config';

const debug = _debug('app:bin:compile');
const error = _debug('app:bin:error');
const info = _debug('app:bin:info');
const paths = config.utils_paths;

// 异步执行打包过程
(async function () {
  try {
    debug('🍀 运行webpackCompiler...');
    // 加载 webpack 打包函数
    const stats = await webpackCompiler(webpackConfig);
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      error('😣 配置出错,进程退出 "1".');
      process.exit(1);
    }
    info('😁 打包完成! 复制文件到 dist 目录...');
    fs.copySync(paths.client('static'), paths.dist());
  } catch (msg) {
    error('😡 打包出错!', msg);
    process.exit(1);
  }
})();
