// json 字符串解析
export function parseStr(str) {
  let result = null;
  try {
    result = JSON.parse(str);
  } catch (error) {
    console.log(error);
  }
  return result;
}

export function generateStr(obj) {
  return JSON.stringify(obj);
}

export function get() {
  try {
    const result = window.localStorage.getItem('togepi.user');
    return parseStr(result);
  } catch (error) {
    if (error.name === 'SecurityError') {
      return null;
    }
    throw error;
  }
}

export function set(obj) {
  try {
    const str = generateStr(obj);
    window.localStorage.setItem('togepi.user', str);
  } catch (error) {
    if (error.name === 'SecurityError') {
      return;
    }
    throw error;
  }
}
// 检查是否登录
export function isAuth() {
  return !!get();
}

// 检查是否是 admin
export function isAdmin() {
  const user = get() || {
    roleFlag: 'admin'
  };
  return user.roleFlag === 'admin';
}

// 退出清除 storage
export function logout() {
  window.localStorage.removeItem('togepi.user');
}
