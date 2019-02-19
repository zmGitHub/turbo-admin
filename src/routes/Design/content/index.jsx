import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import scrollIntoView from 'scroll-into-view-if-needed'
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
    this.setState(({ components }) => ({ components: components.concat(component) }))
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event, data) => {
    event.stopPropagation()
    const { currentTarget } = event
    window.ee.emit('GET_COMPONENT_DATA', data)
    this.setState({ settingCollapse: true }, () => {
      scrollIntoView(currentTarget, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
        boundary: this.scrollContentRef
      })
    })
  }

  reset = (event) => {
    event.stopPropagation()
    window.ee.emit('RESET_LAYOUT_STATUS', null)
    this.setState({ settingCollapse: false, siderCollapse: false })
  }

  openSiderPanel = () => {
    this.setState({ siderCollapse: true })
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
    console.warn('警告: mobile render....')
    const { components, siderCollapse, settingCollapse } = this.state
    const contentStyle = classnames('x-design-content-mobile', {
      'active-template': siderCollapse && !settingCollapse,
      'active-all': siderCollapse && settingCollapse,
      'active-setting': !siderCollapse && settingCollapse
    })
    return (
      <div onClick={this.reset} className="x-design-content">
        <div id="js-scroll-content" className={contentStyle}>
          <SortableList
            useDragHandle
            helperClass="drag-el"
            onSortEnd={this.onSortEnd}
          >
            {components.map((item, index) => (
              <SortableItem key={`template_${item.key}`} index={index} item={item} onClick={this.getElSetting} />
            ))}
          </SortableList>
        </div>
      </div>
    )
  }
}

export default Mobile
