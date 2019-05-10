import React from 'react'
import { Route, Switch } from 'dva/router'
import Cookies from 'js-cookie'

const Authorized = ({ routes = [] }) => {
  const userInfo = Cookies.getJSON('nTalk_CACHE_DATA')
  console.log(userInfo)
  return (
    <Switch>
      {
        routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            render={props => (<route.component {...props} routes={route.routes} />)}
          />
        ))
      }
    </Switch>
  )
}

export default Authorized
