// 路由配置
import Home from './Home';
import Dashboard from './Dashboard';
import Dispatch from './Dispatch';

const createRoutes = () => ({
  path: '/',
  component: Home,
  indexRoute: {
    component: Dashboard
  },
  childRoutes: [
    {
      path: 'dispatch',
      component: Dispatch
    }
  ]
});

export default createRoutes;
