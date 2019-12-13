import { find } from 'lodash'
import { queryImageCategory, queryImageList, getServiceData, getCategory, getArticleById, getMenuInfoById, getSeckillData, getFreemixData, saveImages } from '@/services/component'

export default {
  namespace: 'component',
  state: {
    imageCategories: []
  },
  effects: {
    *saveImages({ payload, callback }, { call, put }) {
      const res = yield call(saveImages, payload)
      if (callback) callback(res)
    },
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
    *getImageList({ payload, callback }, { call }) {
      const res = yield call(queryImageList, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取文章
    *getArticle({ payload, callback }, { call }) {
      const res = yield call(getArticleById, payload)
      if (callback) {
        callback(res)
      }
    },
    *getMenuInfo({ payload, callback }, { call }) {
      const res = yield call(getMenuInfoById, payload)
      if (callback) {
        callback(res)
      }
    },
    // 通用designdata
    *serviceData({ payload, callback }, { call }) {
      const res = yield call(getServiceData, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取类目数据
    *getCategory({ payload, callback }, { call }) {
      const res = yield call(getCategory, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取整点秒杀
    *getSeckill({ payload, callback }, { call }) {
      const res = yield call(getSeckillData, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取套购数据
    *getFreemix({ payload, callback }, { call }) {
      const res = yield call(getFreemixData, payload)
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
