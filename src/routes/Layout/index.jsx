import React from 'react'
import { Layout } from 'antd'
import Header from '@/components/Headers'
import './index.less'

const { Content } = Layout

const LayoutBase = ({ children }) => (
  <Layout className="x-layout">
    <Content className="x-layout-content">
      <Header />
      <Layout className="x-layout-content-main">{children}</Layout>
    </Content>
  </Layout>
)

export default LayoutBase
