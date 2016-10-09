import { get, updateParamas } from 'containers/fetch';
import { logout } from 'containers/auth';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function requestLogError() {
  return {
    type: LOGOUT_FAILURE,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// 调用 API 发起用户退出
export function logoutUser(router) {
  return dispatch => {
    // 请求发起 通知 state
    dispatch(requestLogout());
    return get('/api/user/logout')
      .then(response => {
        if (response) {
          // 用户退出清除 localstorage
          logout();
          dispatch(receiveLogout());
          router.replace('/login');
        } else {
          dispatch(requestLogError());
        }
      }, error => {
        console.log(error);
      });
  };
}

// 调用 API 发起用户退出
export function resetAction(params) {
  return () => {
    return updateParamas('/api/user/change_pwd', params)
      .then(response => {
        if (response) {
          return Promise.resolve(response);
        }
      }, error => {
        console.log(error);
      });
  };
}
