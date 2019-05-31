
import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import { Route, Switch, Redirect } from 'dva/router'
import { includes } from 'ramda'
import Loader from '@/components/Setting'
import LayoutDesign from './design'
import LayoutBase from './base'
import Exception401 from '../Exception/401'
import Exception500 from '../Exception/500'


@connect(({ app, loading }) => ({
  app,
  loading: loading.effects['app/initUserInfo']
}))
class LayoutIndex extends PureComponent {
  render() {
    const { app: { user } } = this.props
    let children = <Loader />
    if (user && user.id) {
      const { shopId, roles } = user
      let indexPath = '/401'
      if (includes('OPERATOR', roles) || includes('ADMIN', roles)) {
        indexPath = '/dashboard/index'
      } else if (shopId) {
        indexPath = `/design/shop?id=${shopId}`
      } else {
        indexPath = '/401'
      }
      children = (
        <Switch>
          <Redirect from="/" to={indexPath} />
          <Route path="/design" component={LayoutDesign} />
          <Route path="/dashboard" component={LayoutBase} />
          <Route path="/401" component={Exception401} />
        </Switch>
      )
    } else {
      children = <Exception500 desc="无法获取当前用户信息" />
    }
    return (
      <Layout className="x-layout-loading">
        {children}
      </Layout>
    )
  }
}

export default LayoutIndex

