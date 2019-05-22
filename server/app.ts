import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import routers from './routers'

const app:Koa = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('系统错误')
    console.log(err)
    err.status = err.statusCode || err.status || 500
    throw err
  }
})

// 静态文件
app.use(koaStatic('./dist'))
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
