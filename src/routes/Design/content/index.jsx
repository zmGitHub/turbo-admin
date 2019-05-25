import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva'
import { message } from 'antd'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import scrollIntoView from 'scroll-into-view-if-needed'
import html2canvas from 'html2canvas'
import { is, remove, add, dec, findIndex, propEq, insert, map } from 'ramda'
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

@connect(({ design, loading }) => ({
  list: design.list,
  submitting: loading.effects['design/create']
}))
class Mobile extends PureComponent {
  scrollContentRef = null

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
    window.ee.on('ADD_COMPONENT_DATA', this.addComponent)
    window.ee.on('SAVE_COMPONENT_DATA', this.save)
    dispatch({
      type: 'design/getDataById',
      payload: { id: this.params.id },
      callback: (components) => {
        this.setState({ components })
      }
    })
  }

  componentWillUnmount() {
    window.ee.off('OPEN_SIDER_PANEL')
    window.ee.off('ADD_COMPONENT_DATA')
    window.ee.off('SAVE_COMPONENT_DATA')
  }

  addComponent = (component) => {
    const { componentId, components } = this.state
    const { dispatch } = this.props
    const { key, content, style } = component
    let componentArr = []
    let index = 0
    if (!componentId) {
      componentArr = components.concat(component)
    } else {
      index = findIndex(propEq('key', componentId))(components)
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
      dispatch({
        type: 'design/add',
        payload: { component, index }
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

  save = () => {
    const { dispatch, list } = this.props
    const { id } = this.params
    const data = JSON.stringify(list)
    message.loading('数据处理中...').then(() => {
      const { firstChild, clientHeight } = this.scrollContentRef
      firstChild.style.overflowY='hidden'
      map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.backgroundColor = '#ffffff'
        // eslint-disable-next-line no-param-reassign
        el.style.opacity = 1
        if (el.offsetTop > clientHeight) {
          el.setAttribute('data-html2canvas-ignore', true)
        } else {
          el.removeAttribute('data-html2canvas-ignore')
        }
      }, firstChild.childNodes)

      html2canvas(this.scrollContentRef, {
        height: 667,
        foreignObjectRendering: true,
        backgroundColor: '#fff',
        useCORS: true,
        allowTaint: true
      }).then((canvas) => {
        const poster = canvas.toDataURL('image/jpeg', 0.5)
        firstChild.style.overflowY='auto'
        dispatch({
          type: 'design/update',
          payload: {
            id,
            poster,
            data
          },
          callback: (res) => {
            if (res) {
              message.success('更新成功')
            } else {
              message.error('更新失败')
            }
          }
        })
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
    return (
      <div onClick={this.reset} className="x-design-content">
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
