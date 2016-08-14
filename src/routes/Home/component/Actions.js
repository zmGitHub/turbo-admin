/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const RECEIVE_GET = 'RECEIVE_GET';
/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}


export function receiveGet(res) {
  return {
    type: RECEIVE_GET,
    res,
    receivedAt: Date.now()
  };
}

export function fetchGet() {
  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return (dispatch) => {
    return fetch('/api/spare/dispatch/stock')
      .then(response =>
        response.json().then(data => ({ data, response }))).then(({ data, response }) => {
          if (response.ok) {
            dispatch(receiveGet(data));
          }
        }).catch(err => console.log('Error: ', err));
    // 在实际应用中，还需要
    // 捕获网络请求的异常。
  };
}
