/**
 * 常用配置: 端口, MySQL
 */

module.exports = {
  port: 3001, // 主服务启动端口
  mysql: {
    host: process.env.HISENSE_MYSQL_HOST || '127.0.0.1',
    port: process.env.HISENSE_MYSQL_PORT || 3306,
    username: process.env.HISENSE_MYSQL_USERNAME || 'root',
    password: process.env.HISENSE_MYSQL_PASSWORD || 'anywhere',
    database: process.env.HISENSE_MYSQL_DATABASE || 'hisense',
  },
  webpack: {
    publicPath: '/',
    extensions: ['.js', '.jsx', '.json', '.less', '.scss']
  },
}

