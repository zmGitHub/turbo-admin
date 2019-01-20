import React from 'react'
import { Icon } from 'antd'
import './common/index.less'

const defaultConfig = {
  title: '组件',
}

const Error = ({ config = defaultConfig }) => (
  <div className="editor-error">
    <Icon type="warning" />
    <div className="editor-error-desc">{config.title}导入失败</div>
  </div>
)

export default Error
