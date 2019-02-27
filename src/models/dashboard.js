import { map } from 'ramda'
import moment from 'moment'
import Cookies from 'js-cookie'
import { getCSRFToken, queryDesignData, publishDesignData, deleteDesignData } from '@/services/design'

export default {
  namespace: 'dashboard',
  state: {
    data: [],
    total: 0
  },
  effects: {
    *initCSRFToken(_, { call }) {
      const res = yield call(getCSRFToken)
      if(res) {
        Cookies.set('x-csrf-token', res)
      }
    },
    *removeTemplate({ payload ,callback }, { call }) {
      const res = yield call(deleteDesignData, payload)
      if (callback) {
        callback(res)
      }
    },
    // 发布(立即/定时)
    *publishTemplate({ payload ,callback }, { call }) {
      const res = yield call(publishDesignData, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取模板
    *getTemplates({ payload }, { call, put }) {
      const res = yield call(queryDesignData, payload)
      const { total, data } = res
      const items = map(({ id, name, isPublish, isTiming, timingTime, type, updatedAt, url }) => ({
        id,
        name,
        isPublish,
        isTiming,
        timingTime: timingTime ? moment(timingTime).valueOf() : false,
        updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        type,
        url
      }), data)
      yield put({ type: 'initTemplates', payload: { total, data: items  }})
    },
  },
  reducers: {
    initTemplates(state, action) {
      const { payload: { total, data } } = action
      return {
        ...state,
        total,
        data
      }
    }
  },
  subscriptions: {
    setpu({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({ type: 'initCSRFToken' })
        if (pathname === '/') {
          dispatch({ type: 'getTemplates', payload: { type: 1, pageNo: 1, pageSize: 8 } })
        }
      })
    }
  }
}
