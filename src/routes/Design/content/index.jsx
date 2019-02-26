import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import scrollIntoView from 'scroll-into-view-if-needed'
import { is, remove, add, dec, findIndex, propEq, insert } from 'ramda'
import classnames from 'classnames'
import { getPageQuery } from '@/utils'
import SortableItem from './sortableItem'



const SortableList = SortableContainer(({ children }) => (
  <div className="container">
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  </div>
));

@connect()
class Mobile extends PureComponent {
  scrollContentRef = null

  constructor(props) {
    super(props)
    this.state = {
      componentId: '',
      components: [],
      settingCollapse: false,
      siderCollapse: false,
    }
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    this.scrollContentRef = document.getElementById('js-scroll-content')
    const params = getPageQuery(location.pathname)
    window.ee.on('OPEN_SIDER_PANEL', this.openSiderPanel)
    window.ee.on('ADD_COMPONENT_DATA', this.addComponent)
    dispatch({
      type: 'design/getDataById',
      payload: { id: params.id },
      callback: (components) => {
        this.setState({ components })
      }
    })
  }

  addComponent = (component) => {
    const { componentId, components } = this.state
    const { key, content, style } = component
    let componentArr = []
    if (!componentId) {
      componentArr = components.concat(component)
    } else {
      const index = findIndex(propEq('key', componentId))(components)
      componentArr = insert(add(index, 1), component, components)
    }
    this.setState({ componentId: key, components: componentArr, siderCollapse: true }, () => {
      const el = document.getElementById(`component_${key}`)
      this.scrollElement(el)
      window.ee.emit('GET_COMPONENT_DATA', {
        id: key,
        name: content.component,
        data: content.data,
        componentStyle: style
      })
    })
  }

  // 删除选中的元素
  onDelete = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { components } = this.state
    const index = +currentTarget.dataset.index
    const componentLenth = components.length - 1
    // TODO: 这里逻辑有待优化
    if (is(Number, index)) {
      let componentId = ''
      if (index < componentLenth) {
        componentId = components[index + 1].key
      } else if (index === componentLenth && componentLenth > 0) {
        componentId = components[index - 1].key
      }
      this.setState({
        componentId,
        components: remove(index, 1, components),
      }, () => {
        const { dispatch } = this.props
        dispatch({
          type: 'design/delete',
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
    setTimeout(() => {
      scrollIntoView(target, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
        boundary: this.scrollContentRef
      })
    }, 500)
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event, data) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { id } = data
    window.ee.emit('RESET_SIDER_STATUS', data)
    window.ee.emit('GET_COMPONENT_DATA', data)
    this.setState({ componentId: id, settingCollapse: true, siderCollapse: false }, () => {
      this.scrollElement(currentTarget)
    })
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
          type: 'design/sort',
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
        type: 'design/sort',
        payload: { arrayMove, oldIndex, newIndex }
      })
    })
  }

  render() {
    const { componentId, components, siderCollapse, settingCollapse } = this.state
    const contentStyle = classnames('x-design-content-mobile', {
      'active-template': siderCollapse && !settingCollapse,
      'active-all': siderCollapse && settingCollapse,
      'active-setting': !siderCollapse && settingCollapse
    })
    console.warn('mobile render')
    return (
      <div onClick={this.reset} className="x-design-content">

        <div id="js-scroll-content" className={contentStyle}>
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
