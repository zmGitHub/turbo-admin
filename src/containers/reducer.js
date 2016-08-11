import {
  LOAD_DATA_INITIATION,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  CLEAR_DATA_ERROR,
  RECEIVE_GET
} from './constants';

// 初始化数据
const initialState = {
  isLoading: false,
  user: {}, // 用户
  dispatch: {}, // 分发
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
        isLoading: true
      });
    case LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        dispatch: action.data,
      });
    case LOAD_DATA_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case CLEAR_DATA_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: {},
      });
    case RECEIVE_GET:
      return Object.assign({}, state, {
        isLoading: false,
        dispatch: action.data
      });

    default:
      return state;
  }
};

export default basicReducer;
