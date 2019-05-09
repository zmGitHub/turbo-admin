
import React from 'react'
import { Route } from 'dva/router'
import { Layout } from 'antd'



const LayoutBase = ({ routes }) => (
  <Layout>
    {
      routes.map((route, index) => (
        <Route
          key={`${index}_root`}
          path={route.path}
          exact={route.exact}
          render={props => (<route.component {...props} routes={route.routes} />)}
        />
      ))
    }
  </Layout>
)

export default LayoutBase
