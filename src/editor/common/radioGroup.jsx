import React from 'react'
import { Slider, InputNumber } from 'antd'

import './index.less'

const defaultConfig = {
  title: '未设置名称',
  value: 0,
  min: 0,
  max: 999
}

const RadioGroup = ({ config = defaultConfig, onPropsChange }) => {
  const { title } = config
  return (
    <div className="editor-content">
      <h4 className="editor-content-title">{title || '未设置标题'}</h4>
      <div className="editor-content-slider">
        <Slider
          min={1}
          max={20}
          onChange={onPropsChange}
        />
        <InputNumber
          min={1}
          max={20}
          onChange={onPropsChange}
        />
      </div>
    </div>
  )
}

export default RadioGroup
