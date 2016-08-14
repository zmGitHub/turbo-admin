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
export function logoutUser() {
  return dispatch => {
    // 请求发起 通知 state
    dispatch(requestLogout());

    return fetch('/api/user/logout')
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('id_token');
          dispatch(receiveLogout());
        } else {
          dispatch(requestLogError());
        }
        return Promise.resolve(response);
      }, error => {
        return Promise.resolve(error);
      }).catch((err) => {
        return Promise.reject(err);
      });
  };
}
