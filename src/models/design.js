import { concat } from 'lodash'

export default {
  namespace: 'design',
  state: {
    list: [],
  },
  reducers: {
    initial(state) {
      return Object.assign(state, { fetch: false })
    },
    addComponent(state, action) {
      const { payload } = action
      const { list } = state
      return {
        ...state,
        list: concat(list, payload)
      }
    },
    updateComponent(state, action) {
      const { payload } = action
      return {
        ...state,
        list: payload
      }
    },
    sortComponent(state, action) {
      const { payload } = action
      return {
        ...state,
        list: payload
      }
    }
  },
  effects: {
    // 添加新组件
    *add(action, { put }) {
      const { payload } = action
      yield put({ type: 'addComponent', payload })
    },
    // 更新组件样式
    *update(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponent', payload })
    },
    // 组件排序
    *sort(action, { put }) {
      const { payload } = action
      yield put({ type: 'sortComponent', payload })
    },
    *getList(action, { put }) {
      yield put({ type: 'initial' })
    }
  }
}
