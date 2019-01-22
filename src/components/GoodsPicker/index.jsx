import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd'
import { trim } from 'lodash'

import './index.less'


class GoodsPicker extends PureComponent {

  static defaultProps = {
    visible: false
  }

  inputValue = ''

  state ={
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state
    if (nextProps.visible !== visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  handleInputChange = (e) => {
    this.inputValue = trim(e.target.value)
  }

  handleConfirm = () => {
    const { onChange } = this.props
    this.setState({ visible: false }, () => {
      onChange({ page: '/pages/goods', type: 'navigate', query: this.inputValue })
    })
  }

  render() {
    const { visible } = this.state
    return (
      <Modal
        destroyOnClose
        width="520px"
        title="选择商品"
        className="x-goods-picker-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleConfirm}
        onOk={this.handleConfirm}
        visible={visible}
      >
        <Input onChange={this.handleInputChange} placeholder="多个商品请用,分开" />
      </Modal>
    );
  }
}

export default GoodsPicker
