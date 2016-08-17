/*
 * action 类型
 */

export const RECEIVE_DISPATCH_FACTORY = 'RECEIVE_DISPATCH_FACTORY';

/*
 * action 创建函数
 */


export function receiveGet(res) {
  return {
    type: RECEIVE_DISPATCH_FACTORY,
    res,
    receivedAt: Date.now()
  };
}

export function fetchGet(paramas) {
  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。
  let url = '/api/spare/dispatch/return/factory';
  let query = '';
  if (paramas) {
    query = Object.keys(paramas).map((key) => {
      if (paramas[key]) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(paramas[key])}`;
      }
    }).filter(item => !!item).join('&');
    url = `${url}?${query}`;
  }
  // Object.keys(paramas).forEach(key => url.searchParams.append(key, paramas[key]));
  return (dispatch) => {
    return fetch(url, { credentials: 'same-origin' })
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
