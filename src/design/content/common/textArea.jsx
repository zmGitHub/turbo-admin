import React from 'react'
import { Input } from 'antd'
import _trim from 'lodash/trim'
import { useSetState } from '@/stores/hook'

import '../index.less'

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
    <div className="content-data">
      <h4 className="content-data-title">{title || '未设置名称'}</h4>
      <div className="content-data-textarea">

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
