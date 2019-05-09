import React from 'react'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Switch } from 'dva/router'
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
    component: LayoutDesign,
    routes: [
      {
        path: '/design/o2o',
        component: Design
      },
      {
        component: Exception
      }
    ]
  },
  {
    path: '/',
    component: LayoutBase,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/auth',
        component: CMPAuth,
      },
      {
        component: Exception
      }
    ]
  },
  {
    component: Exception
  }
]

const RouterConfig = ({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        {
          routes.map((route, index) => (
            <Authorized key={`${index}_root`} {...route} />
          ))
        }
      </Switch>
    </Router>
  </LocaleProvider>

)

export default RouterConfig
