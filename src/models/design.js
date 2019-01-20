import { concat } from 'lodash'
import _find from 'lodash/find'

export default {
  namespace: 'design',
  state: {
    list: [
      {"name":"标题文字1","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字1"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"40px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_1"},
      {"name":"标题文字2","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字2"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"40px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_2"},
      {"name":"标题文字3","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字2"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_3"},
      {"name":"标题文字4","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字3"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_4"},
      {"name":"标题文字5","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字4"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_5"},
      {"name":"标题文字6","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字5"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_6"},
      {"name":"标题文字7","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字6"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_7"},
      {"name":"标题文字8","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字7"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_8"},
      {"name":"标题文字9","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字8"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_9"},
      {"name":"标题文字10","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字9"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_10"},
      {"name":"标题文字11","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字10"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_11"},
      {"name":"标题文字12","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字11"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_12"},
      {"name":"标题文字13","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字12"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_13"},
      {"name":"标题文字14","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字13"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_14"},
      {"name":"标题文字15","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字14"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_15"},
      {"name":"标题文字16","desc":"标题文字","component":"text","content":{"component":"textDesign","data":{"clickType":"navigate","url":"","title":"标题文字15"}},"style":[{"key":"title","name":"字体","items":[{"key":"color","title":"颜色","component":"color","value":"#333333"},{"key":"fontSize","title":"大小","component":"slider","min":10,"max":100,"value":"14px"},{"key":"lineHeight","title":"行高","min":0,"max":100,"component":"slider","value":"140px"},{"key":"textAlign","title":"对齐方式","component":"radioGroup","value":"center"}]}],"key":"test_title_16"},
    ],
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
      const { list } = state
      const { id, styleId, key, value, type } = payload
      const item = _find(list, listItem => listItem.key === id)
      // 定位到组件
      if (item && item.key) {
        // 定位组件里面的内容变化 还是样式变化
        if (type === 'style') {
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
