import { concat, is, remove, add, insert } from 'ramda'
import _find from 'lodash/find'
import { createDesignData, updateDesginBasic, getDesignDataById } from '@/services/design'

export default {
  namespace: 'design',
  state: {
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
      const res = yield call(updateDesginBasic, payload)
      if(callback) {
        callback(res)
      }
    },
    // 添加新组件
    *add(action, { put }) {
      const { payload } = action
      yield put({ type: 'addComponent', payload })
    },
    // 删除组件
    *delete({ payload, callback }, { put }) {
      yield put({ type: 'deleteComponent', payload, callback })
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
    addComponent(state, { payload }) {
      const { list } = state
      const { index, component } = payload
      let components = concat(list, [component])
      if (index) {
        components = insert(add(index, 1), component, list)
      }
      return {
        ...state,
        list: components
      }
    },
    deleteComponent(state, { payload, callback }) {
      const { list } = state
      const { index } = payload
      const componentLenth = list.length
      let component = null
      if (index < componentLenth) {
        component = list[index + 1]
      } else if (index === componentLenth && componentLenth > 0) {
        component = list[index - 1]
      }
      callback(component)
      return {
        ...state,
        list: remove(index, 1, list)
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
    }
  }
}
