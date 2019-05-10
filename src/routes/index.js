import React from 'react'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router'
import Authorized from './authorized'
import LayoutBase from './Layout/base'
import LayoutDesign from './Layout/design'
import Dashboard from './Dashboard'
import CMPAuth from './CMPAuth'
import Design from './Design'

import Exception from './Exception/404'

const routes = [
  {
    path: '/design',
    name: 'designBase',
    component: LayoutDesign,
    routes: [
      {
        name: 'designO2o',
        path: '/design/o2o',
        component: Design
      },
      {
        name: 'designException',
        component: Exception
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    component: LayoutBase,
    routes: [
      {
        name: 'dashboardIndex',
        path: '/dashboard/index',
        exact: true,
        component: Dashboard,
      },
      {
        name: 'dashboardAuth',
        path: '/dashboard/auth',
        exact: true,
        component: CMPAuth,
      },
      {
        name: 'dashboardException',
        component: Exception
      }
    ]
  },
  {
    name: 'exception',
    component: Exception
  }
]

const RouterConfig = ({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Authorized routes={routes} />
    </Router>
  </LocaleProvider>

)

export default RouterConfig
