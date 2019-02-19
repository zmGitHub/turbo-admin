import React from 'react';
import { Icon } from 'antd'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import TemplateMaps from '@/design/templates'
import Container from './container'

// 拖拽元素点
const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

const SortableItem = SortableElement(({ item, onClick }) => {
  const { key, component, content, style } = item
  const componentData = TemplateMaps[component]
  return (
    <div className="drag">
      <Container id={key} componentStyle={style} content={content} onClick={onClick}>
        {(componentStyle, data) => React.createElement(componentData.component, {
          componentStyle,
          data,
        })}
      </Container>
      <DragHandle />
      <div className="drag-tool">
        <div className="drag-tool-item"><Icon type="delete" /></div>
        <div className="drag-tool-item"><Icon type="arrow-up" /></div>
        <div className="drag-tool-item"><Icon type="arrow-down" /></div>
      </div>
    </div>
  )
});

export default SortableItem
