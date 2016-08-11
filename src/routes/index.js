// 路由配置
import CoreLayout from './CoreLayout';
import Home from './Home';
import Login from './Login';
import Dispatch from './Dispatch'; // 发运操作费
import Crossing from './Crossing'; // 过站操作费
import DispatchPrimary from './DispatchPrimary'; // 一次发运
import DispatchSecondary from './DispatchSecondary'; // 二次次发运
import DispatchCrossing from './DispatchCrossing'; // 过站发运
import Factory from './Factory'; // 旧件返工厂
import Industry from './Industry'; // 旧件返工厂
import Claim from './Claim'; // 索赔录入
import ReportPrimary from './ReportPrimary'; // 结算报表 --一级报表
import ReportSecondary from './ReportSecondary'; // 结算报表 --二级报表





const createRoutes = () => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      Dispatch,
      Crossing,
      DispatchPrimary,
      DispatchSecondary,
      DispatchCrossing,
      Factory,
      Industry,
      Claim,
      ReportPrimary,
      ReportSecondary
    ]
  },
  {
    path: 'login',
    component: Login,
  }
]);

export default createRoutes;
