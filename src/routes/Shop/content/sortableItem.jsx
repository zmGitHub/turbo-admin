import React from 'react';
import { Icon, Tooltip } from 'antd'
import { includes } from 'ramda'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import classnames from 'classnames'
import TemplateMaps from '@/design/templates'
import Container from './container'

// 拖拽元素点
const DragHandle = SortableHandle(() => <div data-html2canvas-ignore="true" className="drag-btn"><Icon type="drag" /></div>)

const SortableItem = SortableElement(({ indexing, index, auth, active, item, onClick, onDelete, onSort }) => {
  const { key, component, content, style } = item
  const isAuth = includes(component, auth)
  // TODO: 先这样处理 如果没有找到对应组件 先提示错误
  const componentData = TemplateMaps[component] || { component: TemplateMaps.error }
  return (
    <div className={classnames('drag', { active })}>
      <Container id={key} auth={isAuth} componentStyle={style} content={content} onClick={onClick}>
        {(componentStyle, data) => React.createElement(componentData.component || 'div', {
          component,
          componentStyle,
          data,
        })}
      </Container>
      <DragHandle />
      { !isAuth && <div className="drag-lock"><Icon type="lock" /></div> }
      <div data-html2canvas-ignore="true" className={classnames('drag-tool', { hide: !active })}>
        <Tooltip title="删除">
          <div data-index={indexing} onClick={onDelete} className="drag-tool-item"><Icon type="delete" />{index}</div>
        </Tooltip>
        <Tooltip title="向上移动">
          <div data-type="up" data-index={indexing} onClick={onSort} className="drag-tool-item"><Icon type="arrow-up" /></div>
        </Tooltip>
        <Tooltip title="向上移动">
          <div data-type="down" data-index={indexing} onClick={onSort} className="drag-tool-item"><Icon type="arrow-down" /></div>
        </Tooltip>
      </div>
    </div>
  )
});

export default SortableItem
