import React from 'react'
import { Router, Route, Switch } from 'dva/router'

import Layout from './Layout'
import Dashboard from './Dashboard'
import Design from './Design'

const RouterConfig = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/design" component={Design} />
      </Layout>
    </Switch>
  </Router>
)

export default RouterConfig
