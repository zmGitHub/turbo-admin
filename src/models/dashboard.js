import { map, includes } from 'ramda'
import moment from 'moment'
import { queryDesignData, publishDesignData, setDefaultDesignData, cancelPublish, deleteDesignData } from '@/services/design'

export default {
  namespace: 'dashboard',
  state: {
    tab: 'home',
    data: [],
    total: 0
  },
  effects: {

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
      const items = map((item) => {
        const { id, name, status, canPublish, type, timer, reservation, updatedAt, poster } = item
        const isTiming = includes(status, ['1', '2']) && (reservation ? moment(reservation).isAfter() : moment(timer).isAfter())
        return {
          id,
          name,
          status,
          isDefault: status === '3',
          canPublish,
          isTiming,
          timingTime: reservation ? moment(reservation).valueOf() : moment(timer).valueOf(),
          updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          type,
          poster
        }
      }, res.data)
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
  }
}
