import React from 'react'
import { Layout } from 'antd'
import Header from '@/components/Headers'
import './index.less'

const { Content } = Layout

const LayoutBase = ({ location, children }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header location={location} />
      <Layout className="x-layout-content-main">{children}</Layout>
    </Content>
  </Layout>
)

export default LayoutBase
