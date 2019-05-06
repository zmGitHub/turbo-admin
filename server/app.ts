import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { port } from '../config'
import routers from './routers'

const app:Koa = new Koa()

// 请求数据解析
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}))

// 路由
app.use(routers.routes())
app.use(routers.allowedMethods())
app.on('error', (err:any) => {
  console.error(err)
})
app.listen(port, () => {
  console.log(`服务端启动: ${port}`)
})
