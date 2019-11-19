import { head } from 'lodash'
import { removeImage, saveImage, addImageCategory, updateImageCategory, queryImageCategory, queryImageList, getServiceData, getCategory, getArticleById, getMenuInfoById, getSeckillData, getFreemixData } from '@/services/component'

export default {
  namespace: 'component',
  state: {
    imageCategories: []
  },
  effects: {
    // 添加图片分类
    *addCategory({ payload, callback }, { call }) {
      const res = yield call(addImageCategory, payload)
      if(callback) {
        callback(res)
      }
    },
    // 更新图片分类
    *updateCategory({ payload, callback }, { call }) {
      const res = yield call(updateImageCategory, payload)
      if(callback) {
        callback(res)
      }
    },
    // 获取图片分类
    *getImageCategory({ callback }, { call, put }) {
      const { content } = yield call(queryImageCategory)
      if (content && content.length) {
        yield put({ type: 'initImageCategory', payload: content })
        if (callback) {
          const category = head(content);
          callback(category)
        }
      }
    },
    // 删除图片
    *removeImage({ payload, callback }, { call }) {
      const res = yield call(removeImage, payload)
      if(callback) {
        callback(res)
      }
    },
    // 上传图片
    *uploadImage({ payload, callback }, { call }) {
      const res = yield call(saveImage, payload)
      if(callback) {
        callback(res)
      }
    },
    // 获取图片列表
    *getImageList({ payload ,callback }, { call }) {
      const res = yield call(queryImageList, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取文章
    *getArticle({ payload ,callback }, { call }) {
      const res = yield call(getArticleById, payload)
      if (callback) {
        callback(res)
      }
    },
    *getMenuInfo({ payload ,callback }, { call }) {
      const res = yield call(getMenuInfoById, payload)
      if (callback) {
        callback(res)
      }
    },
    // 通用designdata
    *serviceData({ payload ,callback }, { call }) {
      const res = yield call(getServiceData, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取类目数据
    *getCategory({ payload ,callback }, { call }) {
      const res = yield call(getCategory, payload)
      if (callback) {
        callback(res)
      }
    },
    // 获取整点秒杀
    *getSeckill({ payload ,callback }, { call }) {
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
