import { includes, concat, is } from 'ramda'
import _find from 'lodash/find'
import { createDesignData, updateDesginData, getDesignDataById } from '@/services/design'
import { getPageQuery } from '@/utils'

export default {
  namespace: 'design',
  state: {
    status: {
      design: false,
      params: {}
    },
    list: [],
  },
  effects: {
    // 通过 id 获取数据
    *getDataById({ payload, callback }, { call, put }) {
      const res = yield call(getDesignDataById, payload)
      const list = JSON.parse(res.data)
      if (is(Array, list)) {
        callback(list)
        yield put({ type: 'initial', payload: list })
      }
    },
    // 保存页面数据
    *create({ payload, callback }, { call }) {
      const res = yield call(createDesignData, payload)
      if(callback) {
        callback(res)
      }
    },
    // 更新页面数据
    *update({ payload, callback }, { call }) {
      const res = yield call(updateDesginData, payload)
      if(callback) {
        callback(res)
      }
    },
    // 监听页面是否处于编辑状态
    *updateStatus({ payload }, { put }) {
      yield put({ type: 'updatePageStatus', payload})
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
  },
  reducers: {
    initial(state, action) {
      const { payload } = action
      return {
        ...state,
        list: payload
      }
    },
    addComponent(state, action) {
      const { payload } = action
      const { list } = state
      return {
        ...state,
        list: concat(list, [payload])
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
      const { payload: { arrayMove, oldIndex, newIndex } } = action
      const list = arrayMove(state.list, oldIndex, newIndex)
      return {
        ...state,
        list
      }
    },
    updatePageStatus(state, { payload }) {
      return {
        ...state,
        status: payload
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        const isDesignPage = includes('/design', pathname)
        const params = getPageQuery(pathname)
        dispatch({ type: 'updateStatus', payload: { design: isDesignPage, params } })
      });
    },
  },
}
