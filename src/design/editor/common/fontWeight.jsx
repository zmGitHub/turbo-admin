import React from 'react'
import { Select } from 'antd'
import { useSetState } from '@/stores/hook'
import './index.less'

const { Option } = Select

const FontWeight = ({ config = { value: 300 }, onChange }) => {
  const { title = '字重', value } = config
  const [ state, setState ] = useSetState({ value })
  const onPropsChange = (res) => {
    setState({ value: res })
    if (onChange) {
      onChange({ ...config, value: res, type: 'style' })
    }
  }
  return (
    <div className="editor-content">
      <h4 className="editor-content-title">{title}</h4>
      <div className="editor-content-select">
        <Select
          showSearch
          placeholder="请选择"
          notFoundContent="字重值不存在"
          optionFilterProp="children"
          value={state.value}
          onChange={onPropsChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="100">100</Option>
          <Option value="200">200</Option>
          <Option value="300">300</Option>
          <Option value="400">400</Option>
          <Option value="500">500</Option>
          <Option value="600">600</Option>
          <Option value="700">700</Option>
          <Option value="800">800</Option>
          <Option value="900">900</Option>
          <Option value="bold">bold</Option>
          <Option value="bolder">bolder</Option>
          <Option value="inherit">inherit</Option>
          <Option value="initial">initial</Option>
          <Option value="lighter">lighter</Option>
          <Option value="normal">normal</Option>
          <Option value="unset">unset</Option>
        </Select>
      </div>
    </div>
  )
}

export default FontWeight
