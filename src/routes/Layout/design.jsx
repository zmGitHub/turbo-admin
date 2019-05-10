import React from 'react'
import { Layout } from 'antd'
import Header from '@/components/Headers'
import Authorized from '../authorized'
import './design.less'

const { Content } = Layout

const LayoutDesignBase = ({ location, routes }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">
        <Authorized routes={routes} />
      </Layout>
    </Content>
  </Layout>
)

export default LayoutDesignBase
