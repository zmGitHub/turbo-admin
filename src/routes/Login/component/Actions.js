// import { post } from 'containers/fetch';
import { set } from 'containers/auth';

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
export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true
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

// 用户登录
export function loginAction(params, router) {
  return dispatch => {
    dispatch(requestLogin());
    setTimeout(() => {
      set({ name: '屌丝明' });
      dispatch(receiveLogin());
      router.replace('/');
    }, 2000);
    // 真实线上登录接口
    // return post('/api/user/login', params).then(response => {
    //   if (response.success) {
    //     set(response.result);
    //     dispatch(receiveLogin());
    //     router.replace('/');
    //   }
    // }, error => {
    //   console.log(error);
    // });
  };
}
