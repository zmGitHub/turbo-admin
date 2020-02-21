/**
 * 常用配置: 端口, MySQL
 */
const isDev = process.env.NODE_ENV === 'development'
const port = isDev ? 3001 : 3000 // 主服务启动端口
module.exports = {
  port,
  mysql: {
    host: process.env.HISENSE_MYSQL_HOST || '127.0.0.1',
    port: process.env.HISENSE_MYSQL_PORT || 3306,
    username: process.env.HISENSE_MYSQL_USERNAME || 'root',
    password: process.env.HISENSE_MYSQL_PASSWORD || 'anywhere',
    database: process.env.HISENSE_MYSQL_DATABASE || 'hisense',
    logging: isDev,
  },
  webpack: {
    publicPath: '/',
    extensions: ['.js', '.jsx', '.json', '.less', '.scss']
  },
}

