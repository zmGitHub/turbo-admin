import React from 'react'
import { Switch } from 'antd'
import { useSetState } from '@/stores/hook'

import './index.less'

const defaultConfig = {
  title: '未设置名称',
  value: false
}

const Switcher = ({ config = defaultConfig, onChange }) => {
  const { title, value } = config
  const [ state, setState ] = useSetState({ value })
  const onPropsChange = (changeValue) => {
    setState({ value: changeValue })
    if (onChange && typeof onChange === 'function') {
      onChange({ ...config, value: changeValue, type: 'style' })
    }
  }
  return (
    <div className="editor-content">
      <h4 className="editor-content-title">{title || '未设置名称'}</h4>
      <div className="editor-content-slider">
        <Switch defaultChecked={state.value} onChange={onPropsChange} />
      </div>
    </div>
  )
}

export default Switcher
