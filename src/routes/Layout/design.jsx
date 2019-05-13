import React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'dva/router'
import Header from '@/components/Headers'
import Design from '../Design'
import Shop from '../Shop'
import Exception401 from '../Exception/401'

import './design.less'

const { Content } = Layout

const LayoutDesignBase = ({ location }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">
        <Switch>
          <Route path="/design/shop" component={Shop} />
          <Route path="/design/edit" component={Design} />
          <Route component={Exception401} />
        </Switch>
      </Layout>
    </Content>
  </Layout>
)

export default LayoutDesignBase
