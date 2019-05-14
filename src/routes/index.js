import React from 'react'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch } from 'dva/router'
import Layout from './Layout'
import LayoutBase from './Layout/base'
import LayoutDesign from './Layout/design'
import Exception404 from './Exception/404'

const RouterConfig = ({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/design" component={LayoutDesign} />
        <Route path="/dashboard" component={LayoutBase} />
        <Route component={Exception404} />
      </Switch>
    </Router>
  </LocaleProvider>

)

export default RouterConfig
