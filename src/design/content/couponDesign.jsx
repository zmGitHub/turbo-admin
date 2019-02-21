import React, { PureComponent, Fragment } from 'react'
import { InputNumber, Slider, Radio, Icon } from 'antd'
import { is, last, startsWith } from 'ramda'
import classnames from 'classnames'
import ImagePicker from '@/components/ImagePicker'
import ColorPicker from '@/design/editor/common/color'
import { debounce } from '@/utils'
import defaultImg from '@/static/images/x.png'

const RadioGroup = Radio.Group;

class CouponDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    const { id, height, background = '#fff' } = data
    const backgroundType = startsWith('//', background)? 2 : 1
    const heightValue = Number.parseInt(height, 10)
    this.state = {
      id,
      backgroundType,
      height: heightValue,
      showImagePicker: false,
      backgroundColor: backgroundType === 1 ? background : '#fff',
      backgroundSrc: backgroundType === 2 ? background : ''
    }
  }

  onImageChange = (images) => {
    const { onChange, config: { id } } = this.props
    if(images && images.length) {
      const imgItem = last(images)
      this.setState({ showImagePicker: false, backgroundSrc: imgItem.url }, () => {
        onChange({ id, key: 'background', value: imgItem.url })
      })
    }
  }

  onColorChange = ({ value }) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'background', value })
  }

  onRaioChange = (e) => {
    this.setState({ backgroundType: e.target.value })
  }

  // 任务 id 变化
  onIDChange = debounce((value) => {
    if (is(Number, value)) {
      const { config: { id }, onChange } = this.props
      onChange({ id, key: 'id', value })
    }
  }, 800)

  toggleImagePicker = () => {
    this.setState({ showImagePicker: true })
  }

  // 高度变化
  onHeightChange = (height) => {
    const { onChange, config: { id } } = this.props
    this.setState({ height }, () => {
      onChange({ id, key: 'height', value: `${height}px` })
    })
  }


  render() {
    const { id, showImagePicker, height, backgroundType, backgroundColor, backgroundSrc } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">任务ID</h4>
          <div className="content-data-coupon">
            <InputNumber
              defaultValue={id}
              placeholder="请输入领劵 ID"
              style={{ width: 120 }}
              onChange={this.onIDChange}
              maxLength={10}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">高度</h4>
          <div className="content-data-coupon">
            <Slider
              defaultValue={height}
              min={30}
              max={999}
              value={height}
              onChange={this.onHeightChange}
            />
            <InputNumber
              style={{ marginLeft: '16px' }}
              min={30}
              max={999}
              defaultValue={height}
              value={height}
              onChange={this.onHeightChange}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">背景选择</h4>
          <div className="content-data-coupon column">
            <RadioGroup onChange={this.onRaioChange} value={backgroundType}>
              <Radio value={1}>颜色</Radio>
              <Radio value={2}>背景</Radio>
            </RadioGroup>
            <div className="content">
              <div className={classnames("color-content", { hide: backgroundType !==1 })}>
                <ColorPicker config={{ value: backgroundColor }} onChange={this.onColorChange} />
              </div>
              <div className={classnames("imager-content", { hide: backgroundType !==2 })}>
                <img src={backgroundSrc || defaultImg} alt="单张图片" />
                <div onClick={this.toggleImagePicker} className="imager-content-mask"><Icon type="edit" /></div>
              </div>
            </div>
          </div>
        </div>
        <ImagePicker visible={showImagePicker} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default CouponDesign
