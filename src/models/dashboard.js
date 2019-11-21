import { map } from 'ramda'
import moment from 'moment'
import { queryDesignData, publishAdmin, publishO2o, cancelPublish, deleteDesignData } from '@/services/design'

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
    // admin发布(立即/定时)
    *publishAdmin({ payload ,callback }, { call }) {
      const res = yield call(publishAdmin, payload)
      if (callback) {
        callback(res)
      }
    },
    // o2o 发布
    *publishO2o({ payload ,callback }, { call }) {
      const res = yield call(publishO2o, payload)
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

    // 获取模板
    *getTemplates({ payload }, { call, put }) {
      const res = yield call(queryDesignData, payload)
      const { total } = res
      const { tab } = payload
      const items = map((item) => {
        const { id, name, path, status, canPublish, type, timer, updatedAt, poster, posterId } = item
        const isTiming = status === '2' && moment(timer).isAfter()
        return {
          id,
          name,
          path,
          status,
          isDefault: status === '3',
          canPublish,
          isTiming,
          timingTime: isTiming ? moment(timer).valueOf() : '',
          updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          type,
          poster,
          posterId
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
