import React, { PureComponent, Suspense } from 'react';
import { Icon } from 'antd'
import { connect } from 'dva'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import _find from 'lodash/find'
import TemplateMaps from '@/design/templates'


const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

@connect(({ design, loading }) => ({
  design,
  loading
}))
class Mobile extends PureComponent {
  static defaultProps = {
    templateCollapse: false,
    settingCollapse: false,
    onChange: () => {}
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    const { design, onChange, active } = this.props
    // 让当前元素滚动到可视区域的正中间: TODO: 第一次阻止滚动 不知道什么原因会出现整个布局的跳动
    if(active && currentTarget && currentTarget.scrollIntoView) {
      currentTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }
    const id = currentTarget.getAttribute('data-id')
    // TODO: 做缓存校验 如果同为一个组件 不应该触发 change
    const component = _find(design.list, (item) => item.key === id)
    if (component && component.key) {
      this.component = component
      onChange(component)
    }
  }


  onSortEnd = ({ oldIndex, newIndex }) => {
    const { design, dispatch } = this.props;
    const sortItems = arrayMove(design.list, oldIndex, newIndex)
    dispatch({
      type: 'design/sort',
      payload: sortItems
    })
  }

  render() {
    const { design } = this.props
    // 拖拽元素点
    const SortableItem = SortableElement(({ item }) => {
      const { key, component, content, style } = item
      const template = TemplateMaps[component]
      const Lazycomponent = React.lazy(template.component)
      return (
        <div className="drag" data-id={key} onClick={this.getElSetting}>
          <div className="drag-component">
            <Lazycomponent data={content.data} style={style} />
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

    const SortableList = SortableContainer(({ items }) => (
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          {items.map((item, index) => (
            <SortableItem key={`template_${item.key}`} index={index} item={item} />
          ))}
        </Suspense>
      </div>
    ));
    return (
      <SortableList
        useDragHandle
        helperClass="drag-el"
        items={design.list}
        onSortOver={this.onSortOver}
        onSortEnd={this.onSortEnd}
        helperContainer={() => document.getElementById('drag-content')}
      />
    )
  }
}

export default Mobile
