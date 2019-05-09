import React from 'react'
import { Layout } from 'antd'
import { Route, Switch } from 'dva/router'
import Header from '@/components/Headers'
import './design.less'

const { Content } = Layout

const LayoutDesignBase = ({ location, routes }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">
        <Switch>
          {
            routes.map((route, index) => (
              <Route
                key={`${index}_design`}
                path={route.path}
                exact={route.exact}
                render={props => (<route.component {...props} routes={route.routes} />)}
              />
            ))
          }
        </Switch>

      </Layout>
    </Content>
  </Layout>
)

export default LayoutDesignBase
