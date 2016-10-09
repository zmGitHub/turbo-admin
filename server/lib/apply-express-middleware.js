// 基于: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default function applyExpressMiddleware(fn, req, res) {
  const originalEnd = res.end;

  return new Promise((resolve) => {
    res.end = (...needles) => {
      originalEnd.apply(this, needles);
      resolve(false);
    };
    fn(req, res, () => {
      resolve(true);
    });
  });
}
