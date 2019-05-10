import React from 'react'
import { Layout } from 'antd'
import { Route } from 'dva/router'
import Header from '@/components/Headers'
import Design from '../Design'
import './design.less'

const { Content } = Layout

const LayoutDesignBase = ({ location }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">
        <Route path="/design/o2o" component={Design} />
      </Layout>
    </Content>
  </Layout>
)

export default LayoutDesignBase
