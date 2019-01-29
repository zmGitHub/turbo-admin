/* eslint-disable react/jsx-filename-extension */
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createHashHistory'
import router from './routes'
import './index.less'

// 初始化
const app = dva({
  history: createHistory(),
  onHmr: () => {
    console.log('热更新')
    if (module.hot) {
      module.hot.accept()
    }
  }
})

// 注册 model TODO: 后续按需加载
app.model(require('./models/dashboard').default)
app.model(require('./models/component').default)
app.model(require('./models/design').default)

// 插件 loading
app.use(createLoading())
// 默认路由加载组件
app.use({
  onError: (err, msg) => {
    console.log(`系统错误:${err}`)
    console.log(msg)
  }
})


app.router(router)

app.start('#root')
