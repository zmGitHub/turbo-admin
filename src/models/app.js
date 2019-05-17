import Cookies from 'js-cookie'
import { getCSRFToken, getUserInfo, getComponentAuth, updateComponentAuth } from '@/services/app'

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
      const payload = yield call(getUserInfo)
      if (payload && payload.id) {
        yield put({ type: 'initUser', payload })
      }
    },
    // 获取装修组件权限列表
    *getComponentAuth({ callback }, { call, put }) {
      const payload = yield call(getComponentAuth)
      if (payload && payload.id) {
        const { id, data = '' } = payload
        const list = data.split(',')
        if (callback) {
          callback(list)
        }
        yield put({ type: 'initComponentAuth', payload: { id, list } })
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
    },
    initComponentAuth(state, action) {
      const { payload } = action
      return {
        ...state,
        componentAuth: payload
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
