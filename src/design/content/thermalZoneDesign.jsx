import React, { PureComponent, Fragment } from 'react';
import { Icon , Button} from 'antd'
import { last } from 'lodash'
import ImagePicker from '@/components/ImagePicker'
import ThermalZonelPicker from '@/components/ThermalZonePicker'

import defaultImg from '@/static/images/x.png'

class ThermalZoneDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { src, height, coordinates } } = this.props
    this.state = {
      src,
      height,
      coordinates,
      showThermalPicker: false,
      showImgPicker: false
    }
  }


  // 图片加载成功 获取图片的高度 允许加载热区组件
  onImageLoadSuccess = ({ currentTarget }) => {
    const { src, naturalHeight } = currentTarget
    const { onChange, config } = this.props
    // 判断加载的是不是本地图片 TODO: 临时方案
    if (src.includes('.aliyuncs.com') && config.src !== src ) {
      const height = naturalHeight / 2
      this.setState({ height }, () => {
        onChange({ id: config.id, key: 'height', value: height })
      })
    }
  }

  // 图片加载失败则禁止加载热区组件
  onImageLoadError = () => {
    this.setState({ height: 0 })
  }

  // 选择图片
  openImgPicker = () => {
    this.setState({ showImgPicker: true })
  }

  // 设置热区
  openThermalPicker = () => {
    this.setState({ showThermalPicker: true })
  }

  onImageChange = (images) => {
    const { onChange, config: { id } } = this.props
    const imgItem = last(images)
    this.setState({ src: imgItem.url, showImgPicker: false }, () => {
      onChange({ id, key: 'src', value: imgItem.url })
    })
  }

  // 编辑热区
  editThermalZone = (value) => {
    const { config: { id }, onChange } = this.props
    this.setState({ showThermalPicker: false, coordinates: value }, () => {
      onChange({ id, key: 'coordinates', value })
    })
  }

  render() {
    const { showImgPicker, showThermalPicker, src, height, coordinates } = this.state

    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">图片</h4>
          <div className="content-data-thermal">
            <div className="imager-content">
              <img onLoad={this.onImageLoadSuccess} onError={this.onImageLoadError} src={src || defaultImg} alt="单张图片" />
              <div onClick={this.openImgPicker} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
            <Button
              onClick={this.openThermalPicker}
              disabled={height === 0}
              size="large"
            >
              {coordinates.length > 0 ? `您共添加了${coordinates.length}处热区`: '编辑热区'}
            </Button>
          </div>
        </div>
        <ImagePicker visible={showImgPicker} onChange={this.onImageChange} />
        <ThermalZonelPicker
          src={src}
          height={height}
          visible={showThermalPicker}
          coordinates={coordinates}
          onChange={this.editThermalZone}
        />
      </Fragment>
    );
  }
}

export default ThermalZoneDesign
