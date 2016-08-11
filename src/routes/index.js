// 路由配置
import CoreLayout from './CoreLayout';
import Home from './Home';
import Login from './Login';
import Dispatch from './Dispatch';

const createRoutes = () => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      {
        path: 'dispatch',
        component: Dispatch
      }
    ]
  },
  {
    path: 'login',
    component: Login,
  }
]);

export default createRoutes;
