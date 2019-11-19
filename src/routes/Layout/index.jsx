
import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import { Route, Switch, Redirect } from 'dva/router'
import LayoutDesign from './design'
import LayoutBase from './base'
import Exception401 from '../Exception/401'


@connect(({ app, loading }) => ({
  app,
  loading: loading.effects['app/initUserInfo']
}))
class LayoutIndex extends PureComponent {
  timer = null


  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: 'app/initUserInfo' })
  }



  render() {
    return (
      <Layout className="x-layout-loading">
        <Switch>
          <Redirect from="/" to="/dashboard/index" />
          <Route path="/design" component={LayoutDesign} />
          <Route path="/dashboard" component={LayoutBase} />
          <Route path="/401" component={Exception401} />
        </Switch>
      </Layout>
    )
  }
}

export default LayoutIndex

