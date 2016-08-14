import {
  LOAD_DATA_INITIATION,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  CLEAR_DATA_ERROR,
  RECEIVE_GET,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RECEIVE_DISPATCH_PRIMARY,
  RECEIVE_DISPATCH_SECONDARY,
  RECEIVE_DISPATCH_FACTORY,
  RECEIVE_DISPATCH_INDUSTRY,
  RECEIVE_DISPATCH_CROSSING,
  RECEIVE_DISPATCH,
  RECEIVE_STORAGE,
  RECEIVE_REPORT_PRIMARY,
  RECEIVE_REPORT_SECONDARY,
  RECEIVE_REPORT_TERTIARY
} from './constants';

// 初始化数据
const initialState = {
  isFetching: false, // 数据额获取状态
  isAuthenticated: false,
  user: {}, // 用户
  dispatch: {}, // 发运操作费
  dispatchPrimary: {}, // 一次发运
  dispatchSecondary: {}, // 二次发运
  dispatchFactory: {}, // 旧件返工厂
  dispatchIndustry: {}, // 旧件返工贸
  dispatchCrossing: {}, //  过站发运
  storage: {}, //  过站发运
  balancePrimary: {}, // 一级报表
  balanceSecondary: {}, // 二级报表
  reportTertiary: {}, // 三级报表
  balance: {}, // 结算
  error: {} // 错误信息
};

/**
 * @function basicReducer
 * @description 公共 reducer 包括数据加载状态
 * @param {state} - 应用 state
 * @param {action} - 用户操作
 */

export const basicReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_INITIATION:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        dispatch: action.data,
      });
    case LOAD_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case CLEAR_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: {},
      });
    // 上下架列表
    case RECEIVE_GET:
      return Object.assign({}, state, {
        isFetching: false,
        dispatch: action.res
      });
    // 一次发运
    case RECEIVE_DISPATCH_PRIMARY:
      return Object.assign({}, state, {
        isFetching: false,
        dispatchPrimary: action.res
      });
    // 二次发运
    case RECEIVE_DISPATCH_SECONDARY:
      return Object.assign({}, state, {
        isFetching: false,
        dispatchSecondary: action.res
      });
    // 旧件返工厂
    case RECEIVE_DISPATCH_FACTORY:
      return Object.assign({}, state, {
        isFetching: false,
        dispatchFactory: action.res
      });
    // 旧件返工贸
    case RECEIVE_DISPATCH_INDUSTRY:
      return Object.assign({}, state, {
        isFetching: false,
        dispatchIndustry: action.res
      });
    // 过站发运
    case RECEIVE_DISPATCH_CROSSING:
      return Object.assign({}, state, {
        isFetching: false,
        dispatchCrossing: action.res
      });
    // 发运操作费
    case RECEIVE_DISPATCH:
      return Object.assign({}, state, {
        isFetching: false,
        dispatch: action.res
      });
    // 过站操作费
    case RECEIVE_STORAGE:
      return Object.assign({}, state, {
        isFetching: false,
        storage: action.res
      });
    // 一级报表
    case RECEIVE_REPORT_PRIMARY:
      return Object.assign({}, state, {
        isFetching: false,
        balancePrimary: action.res
      });
    // 二级报表
    case RECEIVE_REPORT_SECONDARY:
      return Object.assign({}, state, {
        isFetching: false,
        balanceSecondary: action.res
      });
    // 三级报表
    case RECEIVE_REPORT_TERTIARY:
      return Object.assign({}, state, {
        isFetching: false,
        reportTertiary: action.res
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      });
    default:
      return state;
  }
};

export default basicReducer;
