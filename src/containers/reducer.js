import {
  LOAD_DATA_INITIATION,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  CLEAR_DATA_ERROR,
  RECEIVE_GET,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RECEIVE_DISPATCH_PRIMARY,
  RECEIVE_DISPATCH_SECONDARY
} from './constants';

// 初始化数据
const initialState = {
  isFetching: false, // 数据额获取状态
  isAuthenticated: false,
  user: {}, // 用户
  dispatch: {}, // 分发
  dispatchPrimary: {}, // 一次发运
  dispatchSecondary: {}, // 二次发运
  branch: {}, // 分拨
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
