import React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'dva/router'
import Header from '@/components/Headers'
import Design from '../Design'
import Exception404 from '../Exception/404'

import './design.less'

const { Content } = Layout

const LayoutDesignBase = ({ location }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">
        <Switch>
          <Route exact path="/design/edit" component={Design} />
          <Route component={Exception404} />
        </Switch>
      </Layout>
    </Content>
  </Layout>
)

export default LayoutDesignBase
