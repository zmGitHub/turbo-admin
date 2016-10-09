import {
  reducer as formReducer
} from 'redux-form';
import {
  combineReducers
} from 'redux';

import {
  LOAD_DATA_INITIATION,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from './constants';

// 初始化数据
const initialState = {
  isFetching: false, // 数据额获取状态
  isAuthenticated: false, // 检查用户是否已登录 或者 session 过期
  dashboard: {
    averageOperatingWarning: {
      amount: 4345,
      name: '平均操作费用',
      rate: 59
    },
    averageSettlementWarning: {
      amount: 454,
      name: '平均结算费用',
      rate: 10
    },
    complainWarning: {
      amount: 340,
      name: '工单差评量',
      rate: 20
    },
    delayWarning: {
      amount: 4350,
      name: '工单延误量',
      rate: 70
    },
    generalAnalyses: []
  } // 首页数据
};

/**
 * @function basicReducer
 * @description 公共 reducer 包括数据加载状态
 * @param {state} - 应用 state
 * @param {action} - 用户操作
 */

const basicReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_INITIATION:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case LOAD_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
      // 用户登录成功
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });
      // 用户登录失败
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    default:
      return state;
  }
};


const reducers = {
  basicReducer,
  form: formReducer
};

const reducer = combineReducers(reducers);
export default reducer;
