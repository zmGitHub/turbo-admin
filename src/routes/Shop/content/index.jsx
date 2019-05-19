import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva'
import { message } from 'antd'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import scrollIntoView from 'scroll-into-view-if-needed'
import { is, remove, add, dec } from 'ramda'
import classnames from 'classnames'
import { getPageQuery } from '@/utils'
import SortableItem from './sortableItem'



const SortableList = SortableContainer(({ children }) => (
  <div id="canvas" className="container">
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  </div>
));

@connect(({ app, o2o }) => ({
  list: o2o.list,
  o2o: o2o.info,
  auth: app.componentAuth
}))
class Mobile extends PureComponent {
  scrollContentRef = null

  o2oId = ''

  params = null

  constructor(props) {
    super(props)
    this.state = {
      componentId: '',
      components: [],
      settingCollapse: false,
      siderCollapse: false,
    }
    this.dragEleRef = React.createRef()
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    this.scrollContentRef = document.getElementById('js-scroll-content')
    this.params = getPageQuery(location.pathname)
    window.ee.on('OPEN_SIDER_PANEL', this.openSiderPanel)
    window.ee.on('SAVE_O2O_COMPONENT_DATA', this.save)
    dispatch({
      type: 'o2o/getPublishByShopId',
      payload: { shopId: this.params.id },
      callback: (components) => {
        this.setState({ components })
      }
    })
  }

  componentWillUnmount() {
    window.ee.off('OPEN_SIDER_PANEL')
    window.ee.off('SAVE_O2O_COMPONENT_DATA')
  }


  // 删除选中的元素
  onDelete = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { components } = this.state
    const index = +currentTarget.dataset.index
    const componentLength = components.length - 1
    // TODO: 这里逻辑有待优化
    if (is(Number, index)) {
      let componentId = ''
      if (index < componentLength) {
        componentId = components[index + 1].key
      } else if (index === componentLength && componentLength > 0) {
        componentId = components[index - 1].key
      }
      this.setState({
        componentId,
        components: remove(index, 1, components),
      }, () => {
        const { dispatch } = this.props
        dispatch({
          type: 'o2o/delete',
          payload: { index },
          callback: (res) => {
            if (res && res.key) {
              const { key, content: { data, component }, style } = res
              window.ee.emit('GET_COMPONENT_DATA', {
                id: key,
                name: component,
                data,
                componentStyle: style
              })
            }
          }
        })
      })
    }
  }

  scrollElement = (target) => {
    scrollIntoView(target, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
      boundary: this.scrollContentRef
    })
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event, data) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { id, auth } = data
    if (auth) {
      window.ee.emit('RESET_SIDER_STATUS', data)
      window.ee.emit('GET_COMPONENT_DATA', data)
      this.setState({ componentId: id, settingCollapse: true, siderCollapse: false }, () => {
        this.scrollElement(currentTarget)
      })
    } else {
      message.info('未开放该组件的编辑权限')
    }
  }

  reset = (event) => {
    event.stopPropagation()
    window.ee.emit('RESET_LAYOUT_STATUS', null)
    this.setState({ componentId: '', settingCollapse: false, siderCollapse: false })
  }

  openSiderPanel = () => {
    this.setState({ siderCollapse: true })
  }

  onSort = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { components } = this.state
    const componentLength = components.length - 1
    const { index, type } = currentTarget.dataset
    let newIndex = +index
    const oldIndex = +index
    // TODO: 这里逻辑有待优化
    if (index <= componentLength) {
      newIndex = type === 'up' ? dec(newIndex) : add(newIndex, 1)
      if (newIndex > componentLength) {
        newIndex = componentLength
      } else if(newIndex < 0) {
        newIndex = 0
      }
    }
    if (newIndex !== oldIndex) {
      this.setState(() => ({
        components: arrayMove(components, oldIndex, newIndex)
      }), () => {
        const { dispatch } = this.props
        dispatch({
          type: 'o2o/sort',
          payload: { arrayMove, oldIndex, newIndex }
        })
      })
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ components }) => ({
      components: arrayMove(components, oldIndex, newIndex)
    }), () => {
      const { dispatch } = this.props
      dispatch({
        type: 'o2o/sort',
        payload: { arrayMove, oldIndex, newIndex }
      })
    })
  }

  save = () => {
    const { dispatch, list, o2o } = this.props
    const { id } = this.params
    const data = JSON.stringify(list)
    if (data !== o2o.data) {
      message.loading('数据处理中...').then(() => {
        dispatch({
          type: 'o2o/shopUpdate',
          payload: {
            id: o2o.id,
            data,
            name: o2o.name,
            o2oId: id,
            shopId: o2o.shopId
          },
          callback: (result) => {
            if (result) {
              message.success('更新成功')
              dispatch({
                type: 'o2o/updateInfo',
                payload: result
              })
            } else {
              message.error('更新失败')
            }
          }
        })
      })
    } else {
      message.warn('数据没有修改')
    }
  }

  render() {
    const { auth } = this.props
    const { componentId, components, siderCollapse, settingCollapse } = this.state
    const contentStyle = classnames('x-shop-content-mobile', {
      'active-template': siderCollapse && !settingCollapse,
      'active-all': siderCollapse && settingCollapse,
      'active-setting': !siderCollapse && settingCollapse
    })
    console.warn('mobile render')
    return (
      <div onClick={this.reset} className="x-shop-content">
        <div ref={this.dragEleRef} id="js-scroll-content" className={contentStyle}>
          <SortableList
            useDragHandle
            helperClass="drag-el"
            onSortEnd={this.onSortEnd}
          >
            {components.map((item, index) => (
              <SortableItem
                active={componentId === item.key}
                key={`template_${item.key}`}
                index={index}
                indexing={index}
                item={item}
                auth={auth.list}
                onClick={this.getElSetting}
                onDelete={this.onDelete}
                onSort={this.onSort}
              />
            ))}
          </SortableList>
        </div>
      </div>
    )
  }
}

export default Mobile
