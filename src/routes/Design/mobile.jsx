import React, { PureComponent, Suspense } from 'react';
import { Icon } from 'antd'
import { connect } from 'dva'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import scrollIntoView from 'scroll-into-view-if-needed'
import _find from 'lodash/find'
import { getPageQuery } from '@/utils'
import TemplateMaps from '@/design/templates'


const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

// 拖拽元素点
const SortableItem = SortableElement(({ item, onClick }) => {
  const { key, component, content, style } = item
  const componentData = TemplateMaps[component]
  return (
    <div className="drag" data-id={key} onClick={onClick}>
      <div className="drag-component">
        {
          React.createElement(componentData.component, {
            key,
            id: key,
            style,
            data: content.data,
          })
        }
      </div>
      <DragHandle />
      <div className="drag-tool">
        <div className="drag-tool-item"><Icon type="delete" /></div>
        <div className="drag-tool-item"><Icon type="arrow-up" /></div>
        <div className="drag-tool-item"><Icon type="arrow-down" /></div>
      </div>
    </div>
  )
});



const SortableList = SortableContainer(({ children }) => (
  <div className="container">
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  </div>
));

@connect()
class Mobile extends PureComponent {

  static defaultProps = {
    templateCollapse: false,
    settingCollapse: false,
    onChange: () => {}
  }

  scrollContentRef = null

  constructor(props) {
    super(props)
    this.state = {
      components: []
    }
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    this.scrollContentRef = document.getElementById('js-scroll-content')
    const params = getPageQuery(location.pathname)
    dispatch({
      type: 'design/getDataById',
      payload: { id: params.id },
      callback: (components) => {
        this.setState({ components })
      }
    })
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { onChange } = this.props
    const { components } = this.state

    const id = currentTarget.getAttribute('data-id')
    // TODO: 做缓存校验 如果同为一个组件 不应该触发 change
    const component = _find(components, (item) => item.key === id)
    console.log(component);
    if (component && component.key) {
      this.component = component
      onChange(component, ()=> {
        scrollIntoView(currentTarget, {
          behavior: 'smooth',
          scrollMode: 'if-needed',
          boundary: this.scrollContentRef
        })
      })
    }
  }


  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ components }) => ({
      components: arrayMove(components, oldIndex, newIndex)
    }))
  }

  render() {
    console.warn('警告: mobile render....')
    const { components } = this.state
    return (
      <SortableList
        useDragHandle
        helperClass="drag-el"
        onSortEnd={this.onSortEnd}
      >
        {components.map((item, index) => (
          <SortableItem key={`template_${item.key}`} index={index} item={item} onClick={this.getElSetting} />
        ))}
      </SortableList>
    )
  }
}

export default Mobile
