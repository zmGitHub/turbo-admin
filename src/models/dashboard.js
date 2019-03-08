import { map, sort } from 'ramda'
import moment from 'moment'
import Cookies from 'js-cookie'
import { getCSRFToken, queryDesignData, publishDesignData, setDefaultDesignData, cancelPublish, deleteDesignData } from '@/services/design'

export default {
  namespace: 'dashboard',
  state: {
    tab: 'home',
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
    // 取消发布
    *canclePublish({ payload ,callback }, { call }) {
      const res = yield call(cancelPublish, payload)
      if (callback) {
        callback(res)
      }
    },
    // 设置默认
    *setDefaultTemplate({ payload ,callback }, { call }) {
      const res = yield call(setDefaultDesignData, payload)
      if (callback) {
        callback(res)
      }
    },

    // 获取模板
    *getTemplates({ payload }, { call, put }) {
      const res = yield call(queryDesignData, payload)
      const { total } = res
      const { tab } = payload
      const sortItems = sort((pre, next) => pre > next, res.data)
      const items = map(({ id, name, isPublish, data, isTiming, timingTime, type, updatedAt, url }) => ({
        id,
        name,
        isDefault: isPublish === 1,
        isPublish: data !== "[]",
        isTiming: isTiming && moment(timingTime).isAfter(),
        timingTime: timingTime ? moment(timingTime).valueOf() : false,
        updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        type,
        url
      }), sortItems)
      yield put({ type: 'initTemplates', payload: { tab, total, data: items  }})
    },
  },
  reducers: {
    initTemplates(state, action) {
      const { payload: { tab, total, data } } = action
      return {
        ...state,
        tab,
        total,
        data
      }
    }
  },
  subscriptions: {
    setpu({ dispatch, history }) {
      history.listen(() => {
        dispatch({ type: 'initCSRFToken' })
      })
    }
  }
}
