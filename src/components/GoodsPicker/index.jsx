import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd'
import { trim, split, last } from 'lodash'

import './index.less'


class GoodsPicker extends PureComponent {

  static defaultProps = {
    multiGoods: true,
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
    const { onChange, multiGoods } = this.props
    this.setState({ visible: false }, () => {
      let itemIds = this.inputValue
      if (!multiGoods) {
        itemIds = last(split(itemIds, ','))
      }
      onChange({ page: '/pages/goods', type: 'navigate', query: itemIds })
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
