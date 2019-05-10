import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import * as historyApiFallback from './middleware/api-fallback'
import routers from './routers'
import config from './utils'

const app:Koa = new Koa()

// 静态文件
app.use(koaStatic(config.resolve('dist')))
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

export default app
