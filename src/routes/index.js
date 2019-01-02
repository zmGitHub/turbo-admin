import React from 'react'
import { Router, Route, Switch } from 'dva/router'

import Layout from './Layout'
import Dashboard from './Dashboard'

const RouterConfig = ({ history }) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
