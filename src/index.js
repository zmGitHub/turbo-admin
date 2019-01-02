/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import dva from 'dva'
import dynamic from 'dva/dynamic'
import createLoading from 'dva-loading'
import createHistory from 'history/createHashHistory'
import Loading from '@/components/Loading'
import router from './routes'

console.log('fuck')
// 初始化
const app = dva({
  history: createHistory({
    basename: 'x-project'
  }),
  onHmr: () => {
    console.log('热更新')
    if (module.hot) {
      module.hot.accept()
    }
  }
})

// 插件 loading
app.use(createLoading())
// 默认路由加载组件
// eslint-disable-next-line react/react-in-jsx-scope
dynamic.setDefaultLoadingComponent(<Loading />)
app.use({
  onError: (err, msg) => {
    console.log(`系统错误:${err}`)
    console.log(msg)
  }
})

// -> 注册全局模型 TODO: 目前还不需要
// app.model(require('./models/global').default)


app.router(router)

app.start('#root')
console.log(app)
