import React, { Suspense, lazy } from 'react'
import classnames from 'classnames'
import { Layout, Tooltip } from 'antd'
import TemplateMaps from '@/templates'

const { Sider } = Layout;

const TemplateItem = ({ componentName, handleClick }) => {
  const { config, component } = TemplateMaps[componentName]
  const Lazycomponent = lazy(() => component)
  const { name, desc, content, style } = config
  return (
    <div className="item" onClick={() => { handleClick(config) }}>
      <div className="item-header">
        <div className="item-header-title">{name}</div>
        <div className="item-header-desc">{desc}</div>
      </div>
      <Tooltip title="点击添加到页面">
        <div className="item-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Lazycomponent id={`template_${+new Date()}`} key={`template_${+new Date()}`} style={style} data={content.data} />
          </Suspense>
        </div>
      </Tooltip>
    </div>
  )
}

const Template = ({ active = false, children }) => {
  const designStyle = classnames('x-design-templates', { active })
  return (
    <Sider width="375" className={designStyle}>
      <div className="x-design-templates-content">
        {children || <div>加载中.....</div>}
      </div>
    </Sider>
  )
}

export {
  Template,
  TemplateItem
}
