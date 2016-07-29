// 路由配置
import CoreLayout from './CoreLayout';
import Home from './Home';
import Dispatch from './Dispatch';

const createRoutes = () => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    {
      path: 'dispatch',
      component: Dispatch
    }
  ]
});

export default createRoutes;
