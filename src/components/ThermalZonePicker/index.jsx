import React, { PureComponent } from 'react';
import { Modal, Collapse } from 'antd'
import { isFunction, find } from 'lodash'
import MultiCrops from '@/components/MultiCrops'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'
import './index.less'

const { Panel } = Collapse


class ThermalZonePicker extends PureComponent {

  static defaultProps = {
    coordinates: [],
    src: defaultImg,
    height: 244,
    visible: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible, coordinates: nextProps.coordinates }
    }
    return null
  }


  constructor(props) {
    super(props)
    const { coordinates, visible } = this.props
    this.state = {
      visible,
      coordinates
    }
  }

  handleConfirm = () => {
    const { onChange } = this.props
    const { coordinates } = this.state
    if(isFunction(onChange)) {
      onChange(coordinates)
    }
  }

  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }

  changeCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }

  onLinkerChange = (id, res) => {
    const { coordinates } = this.state
    const coordinate = find(coordinates, (item) => item.id === id)
    if (coordinate && coordinate.id) {
      coordinate.url = res
      this.setState({ coordinates })
    }
  }

  render() {
    const { visible, coordinates } = this.state
    const { height, src } = this.props
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
            height={height}
            onChange={this.changeCoordinate}
            onDelete={this.deleteCoordinate}
            src={src}
          />
          <div className="link-items" style={{ height }}>
            <Collapse bordered={false}>
              {
                coordinates.map(({ url, id }, index) => (
                  <Panel header={`热区${index + 1}`} key={id}>
                    <Linker url={url} multiGoods={false} multiCoupons={false} onChange={(res) => { this.onLinkerChange(id, res) }} />
                  </Panel>
                ))
              }
            </Collapse>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ThermalZonePicker
