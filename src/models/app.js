import Cookies from 'js-cookie'
import { getCSRFToken, getUserInfo } from '@/services/app'

export default {
  namespace: 'app',
  state: {
    user: null
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
    setpu({ dispatch, history }) {
      console.log('88888')
      history.listen(() => {
        console.log('初始化系统数据....')
        dispatch({ type: 'initCSRFToken' })
        dispatch({ type: 'initUserInfo' })
      })
    }
  }
}
