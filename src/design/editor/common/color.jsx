import React from 'react'
import { Popover } from 'antd'
import { BlockPicker } from 'react-color'
import { useSetState } from '@/stores/hook'

import './index.less'

const defaultConfig = {
  value: 0,
  min: 0,
  max: 999
}

// 默认颜色值
const colors = ["#000000", "#00ACC1", "#5E35B1", "#6D4C41", "#7CB342", "#8E24AA", "#039BE5", "#43A047", "#546E7A", "#00897B", "#3949AB", "#757575", "#C0CA33", "#CC0010", "#E53935", "#F4511E", "#00A6AA", "#FB8C00", "#FDD835", "#FFB300"]

const Colorer = ({ config = defaultConfig, onChange }) => {
  const { title, value } = config
  const [ state, setState ] = useSetState({ value })
  // TODO: 进一步优化 是否可以再生出一个 Hook 来处理所有的数据变化
  const onPropsChange = (res) => {
    setState({ value: res.hex })
    if (onChange) {
      onChange({ ...config, value: res.hex, type: 'style' })
    }
  }
  return (
    <div className="editor-content">
      { title ? (<h4 className="editor-content-title">{title}</h4>) : null }
      <div className="editor-content-colorer">
        <Popover
          className="editor-content-colorer-box"
          placement="left"
          title='选择颜色'
          trigger="click"
          content={<BlockPicker colors={colors} color={state.value} triangle="hide" onChangeComplete={onPropsChange} />}
        >
          <div className="editor-content-colorer-box-inner" style={{ backgroundColor: state.value }} />
          <span className="editor-content-colorer-box-value">{state.value}</span>
        </Popover>
      </div>
    </div>
  )
}

export default Colorer
