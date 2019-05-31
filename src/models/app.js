import Cookies from 'js-cookie'
import { getCSRFToken, hasLogin, updateComponentAuth } from '@/services/app'
import {message} from 'antd';

export default {
  namespace: 'app',
  state: {
    user: null,
    componentAuth: {
      id: '',
      list: []
    }
  },
  effects: {
    *initCSRFToken(_, { call }) {
      const res = yield call(getCSRFToken)
      if(res) {
        Cookies.set('x-csrf-token', res)
      }
    },
    // 获取图片分类
    *initUserInfo(_, { call, put }) {
      const payload = yield call(hasLogin)
      if (payload && payload.id) {
        yield put({ type: 'initUser', payload })
      } else {
        message.warn('用户登录过期, 请返回重新登录!')
      }
    },
    // 添加装修组件权限
    *updateComponentAuth({ payload, callback }, { call }) {
      const res = yield call(updateComponentAuth, payload)
      if (callback) {
        callback(res)
      }
    }

  },
  reducers: {
    initUser(state, action) {
      const { payload } = action
      return {
        ...state,
        user: payload
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        dispatch({ type: 'initCSRFToken' })
        dispatch({ type: 'initUserInfo' })
      })
    }
  }
}
