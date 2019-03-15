import React from 'react'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch } from 'dva/router'

import Layout from './Layout'
import Dashboard from './Dashboard'
import Design from './Design'

const RouterConfig = ({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/design" component={Design} />
        </Layout>
      </Switch>
    </Router>
  </LocaleProvider>

)

export default RouterConfig
