import { map } from 'ramda'
import moment from 'moment'
import { queryDesignData } from '@/services/design'

export default {
  namespace: 'dashboard',
  state: {
    data: [],
    total: 0
  },
  effects: {
    // 获取图片分类
    *getTemplates({ payload }, { call, put }) {
      const res = yield call(queryDesignData, payload)
      if (res && res.total) {
        const { total, data } = res
        const items = map(({ id, isPublish, isTiming, timingTime, type, updatedAt }) => ({
          id,
          isPublish,
          isTiming,
          timingTime,
          updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          type
        }), data)
        yield put({ type: 'initTemplates', payload: { total, data: items  }})
      }
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
        if (pathname === '/') {
          dispatch({ type: 'getTemplates', payload: { type: 1, pageNo: 1, pageSize: 8 } })
        }
      })
    }
  }
}
