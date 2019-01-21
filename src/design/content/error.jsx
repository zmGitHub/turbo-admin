import React from 'react'
import { Icon } from 'antd'
import './index.less'

const defaultConfig = {
  title: '组件',
}

const Error = ({ config = defaultConfig }) => (
  <div className="content-error">
    <Icon type="warning" />
    <div className="content-error-desc">{config.title}导入失败</div>
  </div>
)

export default Error
