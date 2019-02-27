import React, { PureComponent, Fragment } from 'react';
import { Icon, Button } from 'antd'
import { last } from 'lodash'
import ImagePicker from '@/components/ImagePicker'
import ThermalZonelPicker from '@/components/ThermalZonePicker'

import defaultImg from '@/static/images/x.png'

const formatImg = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class ThermalZoneDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    const { src, height, coordinates } = data
    this.state = {
      src: `${src}${formatImg}`,
      height,
      coordinates,
      showThermalPicker: false,
      showImgPicker: false
    }
  }


  // 图片加载成功 获取图片的高度 允许加载热区组件
  onImageLoadSuccess = ({ currentTarget }) => {
    const { naturalHeight } = currentTarget
    const { height } = this.state
    const { onChange, config } = this.props
    // 判断加载的是不是本地图片 TODO: 临时方案
    if (height !== naturalHeight) {
      this.setState({ height: naturalHeight }, () => {
        onChange({ id: config.id, key: 'height', value: naturalHeight })
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
    if (images && images.length) {
      const { onChange, config: { id } } = this.props
      const imgItem = last(images)
      const randomSrc = `${imgItem.url}${formatImg}&_=${+new Date()}`
      this.setState({ src: randomSrc, showImgPicker: false, coordinates: [] }, () => {
        onChange({ id, key: 'src', value: imgItem.url })
      })
    } else {
      this.setState({ showImgPicker: false })
    }
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
