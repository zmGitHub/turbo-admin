import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd'
import { trim, split, last } from 'lodash'

import './index.less'


class CouponsPicker extends PureComponent {

  static defaultProps = {
    multiCoupons: true,
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
    const { onChange, multiCoupons } = this.props
    this.setState({ visible: false }, () => {
      let itemIds = this.inputValue
      if (!multiCoupons) {
        itemIds = last(split(itemIds, ','))
      }
      onChange({ page: 'coupons', type: 'click', query: itemIds })
    })
  }

  render() {
    const { visible } = this.state
    return (
      <Modal
        destroyOnClose
        width="520px"
        title="选择优惠券"
        className="x-goods-picker-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleConfirm}
        onOk={this.handleConfirm}
        visible={visible}
      >
        <Input onChange={this.handleInputChange} placeholder="多个优惠券请用,分开" />
      </Modal>
    );
  }
}

export default CouponsPicker
