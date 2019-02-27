import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd'
import { trim, includes } from 'ramda'

import './index.less'


class CouponsPicker extends PureComponent {

  static defaultProps = {
    multiCoupons: true,
    visible: false
  }

  inputValue = ''

  state ={
    value: '',
    visible: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = prevState
    if (nextProps.visible !== visible) {
      return { visible: nextProps.visible, value: nextProps.value }
    }
    return { value: nextProps.value }
  }

  handleInputChange = (e) => {
    this.inputValue = trim(e.target.value)
  }

  handleConfirm = (evt) => {
    const classNames = evt.currentTarget.className
    const { onChange } = this.props
    this.setState({ visible: false }, () => {
      if (includes('ant-btn-primary', classNames)) {
        onChange({ page: 'coupons', type: 'click', query: this.inputValue })
      } else {
        onChange({ query: '' })
      }
    })
  }

  render() {
    const { visible, value } = this.state
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
        <Input type="number" defaultValue={value} onChange={this.handleInputChange} placeholder="请输入优惠券ID" />
      </Modal>
    );
  }
}

export default CouponsPicker
