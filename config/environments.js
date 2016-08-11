export default {
  // ======================================================
  // 覆盖默认配置当: NODE_ENV === 'development'
  // ======================================================
  // NOTE: 开发模式下加载 asset 目录下的静态文件会出问题,因为 file-load 会把 eof ,png等小文件转成 base64 导致浏览器不识别
  // 参考:http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: (config) => ({
    // eval-cheap-module-source-map 开发下回更加快捷
    compiler_devtool: 'eval-cheap-module-source-map',
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxy: {
      enabled: true,
      options: {
        host: 'http://spare.audit.com',
        match: /^\/api\/.*/
      }
    }
  }),

  // ======================================================
  // 覆盖默认配置当: NODE_ENV === 'production'
  // ======================================================
  production: () => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    // 生产模式不打开 sourcemaps 功能
    compiler_devtool: 'null',
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
};
