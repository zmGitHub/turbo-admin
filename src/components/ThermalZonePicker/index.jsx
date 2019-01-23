import React, { PureComponent } from 'react';
import { Modal } from 'antd'
import { trim } from 'lodash'

import MultiCrops from '@/components/MultiCrops'

import './index.less'


class ThermalZonePicker extends PureComponent {

  static defaultProps = {
    multiCoupons: true,
    visible: false
  }

  inputValue = ''

  state ={
    visible: true,
    coordinates: []
  }

  handleInputChange = (e) => {
    this.inputValue = trim(e.target.value)
  }

  handleConfirm = () => {
    const { onChange, multiCoupons } = this.props
    this.setState({ visible: false }, () => {
      // let itemIds = this.inputValue
      // if (!multiCoupons) {
      //   itemIds = last(split(itemIds, ','))
      // }
      // onChange({ page: 'coupons', type: 'click', query: itemIds })
    })
  }

  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }

  changeCoordinate = (coordinate, index, coordinates) => {
    console.log(coordinate)
    console.log(index)
    console.log(coordinates)
    this.setState({
      coordinates,
    })
  }

  handleImgLoad = (e) => {
    console.log('图片加载...')
    console.log(e)
  }

  render() {
    const { visible, coordinates } = this.state
    return (
      <Modal
        destroyOnClose
        width="850px"
        title="编辑图片热区"
        className="x-thermal-picker-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleConfirm}
        onOk={this.handleConfirm}
        visible={visible}
      >
        <div className="x-thermal-picker-body">
          <MultiCrops
            coordinates={coordinates}
            width={375}
            height={244}
            onLoad={this.handleImgLoad}
            onChange={this.changeCoordinate}
            onDelete={this.deleteCoordinate}
            src="http://hisense-img.oss-cn-qingdao.aliyuncs.com/2019/01/17/b26b059c-f7d9-40b8-8aae-2fd756e78a70.png"
          />
          <div className="link-items">
            fasdf
          </div>
        </div>
      </Modal>
    );
  }
}

export default ThermalZonePicker
