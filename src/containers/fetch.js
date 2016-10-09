import request from 'superagent';
import Notification from 'components/Notification';
import Lock from 'components/Lock';

let lockInstance = null;

// 根据返回的数据做检查 PS: 后台会返回错误 但是请求是200 内容为 text
function checkData(response) {
  let data = null;
  // 确保返回的是 json 对象
  if (response.ok && response.type === 'application/json') {
    data = response.body;
    if (lockInstance) {
      lockInstance.destroy();
      lockInstance = null;
    }
  } else {
    data = {
      success: false,
      code: 500,
      msg: '用户未登录'
    };

    if (!lockInstance) {
      lockInstance = Lock.newInstance();
    } else {
      lockInstance.destroy();
      lockInstance = null;
    }
  }
  return Promise.resolve(data);
}

// 数据异常捕获
function errorCatch(response) {
  Notification.open({
    type: 'error',
    title: '系统错误',
    content: response.rawResponse || '未知错误'
  });
  return Promise.reject(response);
}

// get 请求直接在 API 后带参数 api/get/:id
export function get(api) {
  return request
    .get(api)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}

// query 查询接口
export function query(api, params = null) {
  return request
    .get(api)
    .query(params)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}

// post 请求发送对象

export function post(api, params = null) {
  return request
    .post(api)
    .send(params)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}

// put 请求更改数据类型
export function update(api) {
  return request
    .put(api)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}

// 带参数的put请求
export function updateParamas(api, params = null) {
  return request
    .put(api)
    .send(params)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}

// 删除
export function remove(api) {
  return request
    .del(api)
    .then((response) => {
      return checkData(response);
    }, (error) => {
      return errorCatch(error);
    });
}
