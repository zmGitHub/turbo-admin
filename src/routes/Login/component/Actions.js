export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// 登录请求发起
export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

// 登录成功返回用户数据
export function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: data
  };
}

// 用户登录失败
export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

// 调用 API 发起用户登录
export function loginUser(params) {
  console.log(params);
  const data = `nickname=${params.nickname}&password=${params.password}`;
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data
  };

  return dispatch => {
    // 请求发起 通知 state
    dispatch(requestLogin());

    return fetch('/api/user/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))).then(({ user, response }) => {
          if (response.ok) {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', user.nickname);
            // Dispatch the success action
            dispatch(receiveLogin(user));
          } else {
            dispatch(loginError(user.message));
          }
          return Promise.resolve(response);
        }, error => {
          return Promise.resolve(error);
        }).catch((err) => {
          return Promise.reject(err);
        });
  };
}
