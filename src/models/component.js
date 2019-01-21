import { find } from 'lodash'
import { queryImageCategory, queryImageList } from '@/services/component'

export default {
  namespace: 'component',
  state: {
    imageCategories: []
  },
  effects: {
    // 获取图片分类
    *getImageCategory({ callback }, { call, put }) {
      const payload = yield call(queryImageCategory)
      if (payload && payload.length) {
        yield put({ type: 'initImageCategory', payload })
        if (callback) {
          const category = find(payload, ({ isDefault }) => isDefault)
          callback(category)
        }
      }
    },
    // 获取图片列表
    *getImageList({ payload ,callback }, { call }) {
      const res = yield call(queryImageList, payload)
      if (callback) {
        callback(res)
      }
    }
  },
  reducers: {
    initImageCategory(state, action) {
      const { payload } = action
      return {
        ...state,
        imageCategories: payload
      }
    }
  },
}
