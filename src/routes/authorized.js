import React from 'react'
import { Route } from 'dva/router'
import Cookies from 'js-cookie'

const Authorized = ({ component: Component, routes, rest }) => {
  const userInfo = Cookies.getJSON('nTalk_CACHE_DATA')
  console.log(typeof userInfo)
  return (
    <Route
      {...rest}
      render={props => (<Component {...props} routes={routes} />)}
    />
  )
}

export default Authorized
