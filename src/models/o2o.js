import { is, remove } from 'ramda'
import _find from 'lodash/find'
import { updateO2oData, getShopHistory, getTiming, getPublishDataByShopId, rejectDesignData } from '@/services/design'

export default {
  namespace: 'o2o',
  state: {
    timing: { data: [] },
    list: [],
    info: {
      id: '',
    },
    histories: []
  },
  effects: {
    // 获取发布中的数据
    *getTiming({ callback }, { call, put }) {
      const res = yield call(getTiming)
      if (res && res.id) {
        if (res.data && res.data.length > 0) {
          try {
            res.data = JSON.parse(res.data)
          } catch (error) {
            res.data = []
          }
        }
        yield put({ type: 'initTiming', payload: res })
      } else {
        yield put({ type: 'initTiming', payload: { data: [] } })
      }
      callback(res)
    },
    // 获取商家历史模板
    *getDesignHistory({ payload }, { call, put }) {
      const list = yield call(getShopHistory, payload)
      if (is(Array, list) && list.length) {
        yield put({ type: 'getShopHistory', payload: list })
      }
    },
    // 通过 shopId 获取数据
    *getPublishByShopId({ payload, callback }, { call, put }) {
      const res = yield call(getPublishDataByShopId, payload)
      if (res && res.data && res.data.length > 0) {
        const list = JSON.parse(res.data)
        if (is(Array, list)) {
          res.list = list
          callback(list)
          yield put({ type: 'init', payload: res })
        }
      }
    },
    // 商家拒绝
    *reject({ payload, callback }, { call }) {
      const res = yield call(rejectDesignData, payload)
      if(callback) {
        callback(res)
      }
    },

    // 更新页面数据
    *shopUpdate({ payload, callback }, { call }) {
      const res = yield call(updateO2oData, payload)
      if(callback) {
        callback(res)
      }
    },
    // 更新基本数据
    *updateInfo({ payload }, { put }) {
      yield put({ type: 'updateShopInfo', payload })
    },

    // 删除组件
    *delete({ payload, callback }, { put }) {
      yield put({ type: 'deleteComponent', payload, callback })
    },
    // 更新组件样式
    *updateContent(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponentContent', payload })
    },
    // 组件排序
    *sort(action, { put }) {
      const { payload } = action
      yield put({ type: 'sortComponent', payload })
    },
  },
  reducers: {
    init(state, action) {
      const { payload: { list, ...rest } } = action
      return {
        ...state,
        list,
        info: rest
      }
    },
    updateShopInfo(state, action) {
      const { payload: { id, name, data, shopId } } = action
      return {
        ...state,
        info: { id, name, data, shopId }
      }
    },
    getShopHistory(state, action) {
      const { payload } = action
      return {
        ...state,
        histories: payload
      }
    },
    initTiming(state, action) {
      const { payload } = action
      return {
        ...state,
        timing: payload
      }
    },
    deleteComponent(state, { payload, callback }) {
      const { list } = state
      const { index } = payload
      const componentLength = list.length
      let component = null
      if (index < componentLength) {
        component = list[index + 1]
      } else if (index === componentLength && componentLength > 0) {
        component = list[index - 1]
      }
      callback(component)
      return {
        ...state,
        list: remove(index, 1, list)
      }
    },
    updateComponentContent(state, action) {
      const { payload } = action
      const { list } = state
      const { id, key, value } = payload
      const item = _find(list, listItem => listItem.key === id)
      // 定位到组件
      if (item && item.key) {
        item.content.data[key] = value
      }
      return {
        ...state,
        list
      }
    },
    sortComponent(state, action) {
      const { payload: { arrayMove, oldIndex, newIndex } } = action
      const list = arrayMove(state.list, oldIndex, newIndex)
      return {
        ...state,
        list
      }
    }
  }
}
