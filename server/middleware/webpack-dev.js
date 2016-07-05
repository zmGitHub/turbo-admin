import webpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import _debug from 'debug';
import config from '../../config';

const paths = config.utils_paths;
const debug = _debug('app:server:webpack-dev');

export default function(compiler, publicPath) {
  debug('启用 webpack dev middleware.');

  const middleware = webpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  });

  return async function koaWebpackDevMiddleware(ctx, next) {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      // 这里调用的 arguments 但是 es6里面是不允许写 arguments 的
      setHeader: (...rest)=> {
        ctx.set.apply(ctx, rest);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
