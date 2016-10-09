// 路由配置
import CoreLayout from './CoreLayout';
import Home from './Home';
import Login from './Login';
import Components from './Components';
import { isAuth } from 'containers/auth'; // 用户权限验证

// TODO: 重构登录验证

const createRoutes = () => ([
  {
    path: '/',
    onEnter(nextState, replace) {
      if (!isAuth()) {
        replace('login');
      }
    },
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      Components
    ]
  },
  {
    path: 'login',
    component: Login,
    onEnter(nextState, replace) {
      if (isAuth()) {
        replace('/');
      }
    }
  }
]);

export default createRoutes;
