import { propEq, find, concat, remove, map, includes } from 'ramda'
import moment from 'moment'
import { getPoster, queryPoster, createPoster, updatePoster, removePoster } from '@/services/poster'

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
      const res = yield call(createPoster, payload)
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
        const isTiming = status === '2' && moment(timer).isAfter()
        return {
          id,
          name,
          status,
          isDefault: status === '3',
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
  },
  reducers: {
    initItems(state, action) {
      const { payload: { list, url } } = action
      return {
        ...state,
        items: list,
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
