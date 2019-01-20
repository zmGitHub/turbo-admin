import React from 'react'
import { Radio } from 'antd'
import { useSetState } from '@/stores/hook'

import './index.less'

const defaultConfig = {
  title: '未设置名称',
  value: 0,
  min: 0,
  max: 999
}

const RadioGroup = ({ config = defaultConfig, onChange }) => {
  const { title, value, options } = config
  const [ state, setState ] = useSetState({ value })
  const onPropsChange = (res) => {
    setState({ value: res.target.value })
    if (onChange) {
      onChange({ ...config, value: res.target.value, type: 'style' })
    }
  }
  return (
    <div className="editor-content">
      <h4 className="editor-content-title">{title || '未设置标题'}</h4>
      <div className="editor-content-radio">
        <Radio.Group options={options} onChange={onPropsChange} value={state.value} />
      </div>
    </div>
  )
}

export default RadioGroup
