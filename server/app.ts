import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { port } from '../config'
import routers from './routers'
import config from './utils'

const app:Koa = new Koa()

console.log(config.isDev)
// 请求数据解析
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}))

// 路由
app.use(routers.routes())
app.use(routers.allowedMethods())

app.listen(port, (err: any)=> {
  console.log(err)
})
