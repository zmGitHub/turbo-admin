import React from 'react'
import { Input } from 'antd'
import _trim from 'lodash/trim'
import { useSetState } from '@/stores/hook'

import './index.less'

const { TextArea } = Input;

const Ranger = ({ title, value, onChange }) => {
  const [ state, setState ] = useSetState({ value })
  const onPropsChange = (res) => {
    const inputValue = _trim(res.target.value)
    setState({ value: inputValue })
    if (inputValue && onChange) {
      onChange(inputValue)
    }

  }
  return (
    <div className="editor-data">
      <h4 className="editor-data-title">{title || '未设置名称'}</h4>
      <div className="editor-data-textarea">
        <TextArea
          autosize
          value={state.value}
          onChange={onPropsChange}
        />
      </div>
    </div>
  )
}

export default Ranger
