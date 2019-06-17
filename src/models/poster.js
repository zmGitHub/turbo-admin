import { propEq, prepend, multiply, find, concat, remove, map, forEach, includes } from 'ramda'
import moment from 'moment'
import { getPoster, queryPoster, createPoster, updatePoster, removePoster, publishPoster } from '@/services/poster'

const getSettingData = (list) => map(({ key, content, style }) => {
  const { data: { position = { x: 0, y: 0 }, ...rest } } = content
  const item = { key, ...rest, top: position.y, left: position.x }
  forEach((styleItem) => {
    const parseValue = parseInt(styleItem.value, 10)
    if (Number.isNaN(parseValue)) {
      item[styleItem.key] = styleItem.value
    } else {
      item[styleItem.key] = multiply(parseValue, 2)
    }
  }, style)
  return item
}, list)

export default {
  namespace: 'poster',
  state: {
    list: [],
    url: '',
    tab: 'home',
    data: [],
    total: 0
  },
  effects: {
    // 编辑逻辑 start
    *add(action, { put }) {
      const { payload } = action
      yield put({ type: 'addComponent', payload })
    },
    *delete({ payload, callback }, { put }) {
      yield put({ type: 'deleteComponent', payload, callback })
    },
    *updateBackground(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponentBackground', payload })
    },
    *updateStyle(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponentStyle', payload })
    },
    *updateContent(action, { put }) {
      const { payload } = action
      yield put({ type: 'updateComponentContent', payload })
    },
    // 编辑逻辑 end
    *get({ payload, callback }, { call, put }) {
      const res = yield call(getPoster, payload)
      if (res && res.id) {
        let list = []
        let url = ''
        try {
          list = JSON.parse(res.data) || []
          const poster = JSON.parse(res.setting) || ''
          if (poster && poster.length) {
            const background = find(propEq('key', 'background'))(poster)
            if (background && background.url) {
              // eslint-disable-next-line prefer-destructuring
              url = background.url
            }
          }
        } catch (error) {
          list = []
          url = ''
        }
        yield put({ type: 'initItems', payload: { list, url } })
        if (callback) {
          callback(list, url)
        }
      }
    },
    *create({ payload, callback }, { call }) {
      const res = yield call(createPoster, payload)
      if(callback) {
        callback(res)
      }
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(updatePoster, payload)
      if(callback) {
        callback(res)
      }
    },
    *remove({ payload ,callback }, { call }) {
      const res = yield call(removePoster, payload)
      if (callback) {
        callback(res)
      }
    },
    // admin发布(立即/定时)
    *publish({ payload ,callback }, { call }) {
      const res = yield call(publishPoster, payload)
      if (callback) {
        callback(res)
      }
    },

    // 获取模板
    *getPosterList({ payload }, { call, put }) {
      const res = yield call(queryPoster, payload)
      const { total } = res
      const { tab } = payload
      const items = map((item) => {
        const { id, name, status, canPublish, type, timer, updatedAt, poster } = item
        const isTiming = status === '1' && moment(timer).isAfter()
        return {
          id,
          name,
          status,
          isDefault: status === '2',
          canPublish,
          isTiming,
          timingTime: isTiming ? moment(timer).valueOf() : '',
          updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          type,
          poster
        }
      }, res.data)
      yield put({ type: 'initData', payload: { tab, total, data: items  }})
    },
    // 保存数据
    *submit({ payload, callback }, { call, select }) {
      const { id, poster } = payload
      const formData = yield select((state) => {
        const { list, url } = state.poster
        return { list, url }
      })
      if (!formData.url) {
        callback({ code: 500, msg: '请设置背景海报' })
        return
      }
      if (formData.list.length === 0) {
        callback({ code: 500, msg: '请至少添加一个海报元素' })
        return
      }
      const items = getSettingData(formData.list)
      const backgroundItem = {
        key: 'background',
        type: 'image',
        top: 0,
        left: 0,
        url: formData.url,
        width: 750,
        height: 1334
      }
      const params = {
        id,
        poster,
        data: JSON.stringify(formData.list),
        setting: JSON.stringify(prepend(backgroundItem, items))
      }
      const result = yield call(updatePoster, params)
      if (result) {
        callback({ ...result, code: 200, msg: '保存成功' })
      }
    },
  },
  reducers: {
    initItems(state, action) {
      const { payload: { list, url } } = action
      return {
        ...state,
        list,
        url
      }
    },
    initData(state, action) {
      const { payload: { tab, total, data } } = action
      return {
        ...state,
        tab,
        total,
        data
      }
    },
    addComponent(state, { payload }) {
      const { list } = state
      const { component } = payload
      const components = concat([component], list)
      return {
        ...state,
        list: components
      }
    },
    updateComponentBackground(state, action) {
      const { payload: { url } } = action
      return {
        ...state,
        url
      }
    },
    updateComponentStyle(state, action) {
      const { payload } = action
      const { list } = state
      const { id, key, value } = payload
      const item = find(propEq('key', id))(list)
      // 定位到组件
      if (item && item.key) {
        const componentStyle = find(propEq('key', key))(item.style)
        // 定位样式
        if (componentStyle && componentStyle.key) {
          // 最终变动值
          componentStyle.value = value
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
      const item = find(propEq('key', id))(list)
      // 定位到组件
      if (item && item.key) {
        item.content.data[key] = value
      } else {
        console.log('无法定位组件')
      }
      return {
        ...state,
        list
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (includes(pathname, ['/dashboard/posters/list', '/dashboard/posters/o2o'])) {
          const payload = {
            tab: 'home',
            type: 1,
            pageNo: 1,
            pageSize: 8,
            shopId: pathname === '/dashboard/posters/list' ? 1 : -1
          }
          dispatch({ type: 'getPosterList', payload })
        }
      });
    },
  },
}
