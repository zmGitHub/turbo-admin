import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd'
import { trim, map } from 'ramda'

import './index.less'


class NoticePicker extends PureComponent {

  static defaultProps = {
    visible: false
  }

  inputValue = ''

  state ={
    visible: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = prevState
    if (nextProps.visible !== visible) {
      return { visible: nextProps.visible }
    }
    return null
  }

  handleInputChange = (e) => {
    this.inputValue = trim(e.target.value)
  }

  handleConfirm = () => {
    const { onChange } = this.props
    this.setState({ visible: false }, () => {
      const itemIds = trim(this.inputValue)
      onChange(itemIds)
    })
  }

  render() {
    const { visible } = this.state
    const { value } = this.props
    const defaultValue = map(({ id }) => id, value)
    return (
      <Modal
        destroyOnClose
        width="520px"
        title="选择消息"
        className="x-notice-picker-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleConfirm}
        onOk={this.handleConfirm}
        visible={visible}
      >
        <Input defaultValue={defaultValue.join(',')} onChange={this.handleInputChange} placeholder="多个消息组ID请用,分开" />
      </Modal>
    );
  }
}

export default NoticePicker
