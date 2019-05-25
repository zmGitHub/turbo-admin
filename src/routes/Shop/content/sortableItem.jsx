import React, { Fragment } from 'react';
import { Icon } from 'antd'
import { SortableElement } from 'react-sortable-hoc'
import classnames from 'classnames'
import TemplateMaps from '@/design/templates'
import Container from './container'

// 拖拽元素点

const SortableItem = SortableElement(({ active, item, onClick }) => {
  const { key, component, content, style } = item
  // TODO: 先这样处理 如果没有找到对应组件 先提示错误
  const componentData = TemplateMaps[component] || { component: TemplateMaps.error }
  return (
    <div className={classnames('drag', { active })}>
      <Container id={key} auth={content.auth} componentStyle={style} content={content} onClick={onClick}>
        {(componentStyle, data) => React.createElement(componentData.component || 'div', {
          component,
          componentStyle,
          data,
        })}
      </Container>
      { content.auth ? '' : (
        <Fragment>
          <div className="drag-lock"><Icon type="lock" /></div>
        </Fragment>
      ) }
    </div>
  )
});

export default SortableItem
