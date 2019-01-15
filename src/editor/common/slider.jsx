import React from 'react'
import { Slider, InputNumber } from 'antd'
import _parseInt from 'lodash/parseInt'
import { useSetState } from '@/stores/hook'

import './index.less'

const defaultConfig = {
  title: '未设置名称',
  value: 0,
  min: 0,
  max: 999
}




const Ranger = ({ config = defaultConfig, onChange }) => {
  const { title, value, min, max } = config
  const defaultValue = _parseInt(value) || 0
  const [ state, setState ] = useSetState({ value: defaultValue })
  // TODO: 进一步优化 是否可以再生出一个 Hook 来处理所有的数据变化
  console.log(config)
  console.log('窝草......')
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
        <Slider
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={state.value}
          onChange={onPropsChange}
        />
        <InputNumber
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={state.value}
          onChange={onPropsChange}
        />
      </div>
    </div>
  )
}

export default Ranger
