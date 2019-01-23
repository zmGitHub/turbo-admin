import React, { PureComponent, Fragment } from 'react';
import { Icon } from 'antd'
import { last } from 'lodash'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'

class ThermalZoneDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { src, url } } = this.props
    this.state = {
      src,
      url,
      showImgPicker: false
    }
  }

  openImgPicker = () => {
    this.setState({ showImgPicker: true })
  }

  onImageChange = (images) => {
    const { onChange, config: { id } } = this.props
    const imgItem = last(images)
    this.setState({ src: imgItem.url, showImgPicker: false }, () => {
      onChange({ id, key: 'src', value: imgItem.url })
    })
  }

  onLinkerChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'url', value })
  }

  render() {
    const { showImgPicker, src, url } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">图片</h4>
          <div className="content-data-imager">
            <div className="imager-content">
              <img src={src || defaultImg} alt="单张图片" />
              <div onClick={this.openImgPicker} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">链接</h4>
          <div className="content-data-linker">
            <Linker url={url} multiGoods={false} onChange={this.onLinkerChange} />
          </div>
        </div>
        <ImagePicker visible={showImgPicker} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default ThermalZoneDesign
