import databaseConnection from './database'
import app from './app'
import { port } from '../config'

databaseConnection.then(() => {
  app.listen(port, () => {
    console.log(`服务端启动: ${port}`)
  })
}).catch((err) => {
  console.log(err)
  console.log('数据库连接失败')
})
