import webpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import _debug from 'debug';

const debug = _debug('app:server:webpack-hmr');

export default function(compiler, opts) {
  debug('启用 Webpack Hot Module Replacement (HMR).');

  const middleware = webpackHotMiddleware(compiler, opts);
  return async function koaWebpackHMR(ctx, next) {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

    if (hasNext && next) {
      await next();
    }
  };
}
