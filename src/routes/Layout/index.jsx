
import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import { Route, Switch, Redirect } from 'dva/router'
import Loader from '@/components/Setting'
import LayoutDesign from './design'
import LayoutBase from './base'


@connect(({ app, loading }) => ({
  app,
  loading: loading.effects['app/initUserInfo']
}))
class LayoutIndex extends PureComponent {
  render() {
    console.log(this.props);
    const { app: { user } } = this.props
    let children = <Loader />
    if (user && user.id) {
      const { o2oShopId } = user.extra
      const indexPath = user.type === 1 ? '/dashboard/index' : `/design/o2o?id=${o2oShopId}`
      console.log('***********');
      console.log(indexPath)
      children = (
        <Switch>
          <Redirect from="/" to={indexPath} />
          <Route path="/design" component={LayoutDesign} />
          <Route path="/dashboard" component={LayoutBase} />
        </Switch>
      )
    }
    return (
      <Layout className="x-layout-loading">
        {children}
      </Layout>
    )
  }
}

export default LayoutIndex

