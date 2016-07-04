import webpack from 'webpack';
import _debug from 'debug';
import config from '../config';

const debug = _debug('app:build:webpack-compiler');
const DEFAULT_STATS_FORMAT = config.compiler_stats;

export default function webpackCompiler(webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    // 运行 webpack 开始打包
    compiler.run((err, stats) => {
      const jsonStats = stats.toJson();

      debug('打包开始...');
      debug(stats.toString(statsFormat));

      if (err) {
        debug('打包遇到致命错误: ', err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('打包出错:');
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('打包出错'));
      } else if (jsonStats.warnings.length > 0) {
        debug('打包过程出现警告: ');
        debug(jsonStats.warnings.join('\n'));
      } else {
        debug('打包未遇到错误和警告,非常完美!');
      }
      resolve(jsonStats);
    });
  });
}
