import React from 'react'
import { Route, Switch } from 'dva/router'

const RenderEl = ({ route, user, ...rest }) => {

  return <route.component user={user} {...rest} routes={route.routes} />
}

const Authorized = ({ user, routes = [] }) => {
  return (
    <Switch>
      {
        routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            render={props => (<RenderEl user={user} {...props} route={route} />)}
          />
        ))
      }
    </Switch>
  )
}

export default Authorized
