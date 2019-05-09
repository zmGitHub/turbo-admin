
import React from 'react'
import { Route, Switch } from 'dva/router'
import { Layout, Menu, Icon } from 'antd'

const { Header, Sider, Content } = Layout


const LayoutIndexBase = ({ routes }) => (
  <Layout>
    <Sider
      trigger={null}
      collapsible
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>nav 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type='menu-unfold'
        />
      </Header>
      <Content style={{
        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
      >
        <Switch>
          {
            routes.map((route, index) => (
              <Route
                key={`${index}_base`}
                path={route.path}
                exact={route.exact}
                render={props => (<route.component {...props} routes={route.routes} />)}
              />
            ))
          }
        </Switch>
      </Content>
    </Layout>
  </Layout>
)

export default LayoutIndexBase
