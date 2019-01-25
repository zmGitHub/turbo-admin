import { includes, concat } from 'ramda'

import _find from 'lodash/find'

export default {
  namespace: 'design',
  state: {
    designing: false,
    list: [],
  },
  effects: {
    // 监听页面是否处于编辑状态
    *updateStatus({ payload }, { put }) {
      yield put({ type: 'updatePageStatus', payload })
    },
    // 添加新组件
    *add(action, { put }) {
      const { payload } = action
      yield put({ type: 'addComponent', payload })
    },
    // 更新组件样式
    *updateStyle(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponentStyle', payload })
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
    *getList(action, { put }) {
      yield put({ type: 'initial' })
    }
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
    updateComponentStyle(state, action) {
      const { payload } = action
      const { list } = state
      const { id, styleId, key, value } = payload
      const item = _find(list, listItem => listItem.key === id)
      // 定位到组件
      if (item && item.key) {
        const componentStyle = _find(item.style, componentItem => componentItem.key === styleId)
        // 定位样式
        if (componentStyle && componentStyle.key) {
          const itemStyle = _find(componentStyle.items, editorItem => editorItem.key === key)
          // 定位样式属性
          if (itemStyle && itemStyle.key) {
            // 最终变动值
            itemStyle.value = value
          }
        }
      }
      return {
        ...state,
        list
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
      const { payload } = action
      return {
        ...state,
        list: payload
      }
    },
    updatePageStatus(state, { payload: { designing } }) {
      return {
        ...state,
        designing
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'updateStatus', payload: { designing: includes('/design', pathname) } })
      });
    },
  },
}
