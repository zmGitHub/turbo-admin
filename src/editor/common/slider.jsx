import React, { Component } from 'react'
import { Slider, InputNumber } from 'antd'
import _parseInt from 'lodash/parseInt'

import './index.less'

class Ranger extends Component {
  static defaultProps = {
    title: '未设置名称',
    value: 0,
    min: 0,
    max: 999
  }

  constructor(props) {
    super(props);
    console.log('构造函数.....')
    this.state = {value:  _parseInt(this.props.config.value)}
  }


  // componentWillReceiveProps(pros) {
  //   console.log('接受参数了', pros)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('是否 render: ', nextProps.config.id !== this.props.config.id)
  //   return false
  // }

  onPropsChange = (value) => {
    const { onChange, config } = this.props
    this.setState({ value })
    if (onChange && typeof onChange === 'function') {
      onChange({ ...config, value, type: 'style' })
    }
  }

  render() {
    const { config } = this.props
    const { title, min, max } = config
    console.log('slider: render.....')
    const { value } = this.state
    const defaultValue = _parseInt(config.value)
    return (
      <div className="editor-content">
        <h4 className="editor-content-title">{title || '未设置名称'}</h4>
        <div className="editor-content-slider">
          <Slider
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValue}
            onChange={this.onPropsChange}
          />
          <InputNumber
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValue}
            onChange={this.onPropsChange}
          />
        </div>
      </div>
    )
  }
}

export default Ranger
