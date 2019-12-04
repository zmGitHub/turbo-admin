import React, { PureComponent, Fragment } from 'react'
import { Input, message, Checkbox, Icon } from 'antd'
import { connect } from 'dva'
import { map, prop, last, reduce, maxBy } from 'ramda'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import { formatGoodName, formatPrice, removeHTMLTag } from '@/utils'
import defaultImg from '@/static/images/x.png'

const { Group } = Checkbox
const { Search } = Input
const plainOptions = [
  { label: '名称', value: 'title' },
  { label: '描述', value: 'desc' },
  { label: '市场价', value: 'price' },
]

@connect()
class GoodsSliderDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    const { display, moreImg, url, items } = data
    const ids = map(({ id }) => id, items)
    this.state = {
      ids,
      display,
      moreImg,
      url,
      showImagePicker: false
    }
  }

  openImagePicker = () => {
    this.setState({ showImagePicker: true })
  }

  onImageChange = (images) => {
    const { onChange, config: { id } } = this.props
    if (images && images.length) {
      const imgItem = last(images)
      this.setState({ showImagePicker: false, moreImg: imgItem.url }, () => {
        onChange({ id, key: 'moreImg', value: imgItem.url })
      })
    } else {
      this.setState({ showImagePicker: false, moreImg: '' })
    }
  }

  onLinkerChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'url', value })
  }

  onDisplyaChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'display', value })
  }

  onItemsConfirm = (itemIds) => {
    const { config, onChange, dispatch } = this.props
    dispatch({
      type: 'component/serviceData',
      payload: {
        path: 'design/product',
        itemIds
      },
      callback: (res) => {
        const data = prop('_DATA_', res)
        if (res && data) {
          const items = map(({ item, skus }) => {
            const { id, name, advertise, mainImage, highPrice, type } = item
            const originPriceSku = reduce(maxBy((sku) => prop('originPrice', sku.extraPrice) || 0), {}, skus)
            const originPrice = prop('originPrice', originPriceSku.extraPrice) || 0
            return {
              id,
              title: formatGoodName(name),
              desc: removeHTMLTag(advertise),
              src: mainImage,
              price: formatPrice(highPrice),
              originPrice: formatPrice(originPrice),
              type
            }
          }, data)
          onChange({ id: config.id, key: 'items', value: items })
        } else {
          message.info('未找到商品, 请确认商品组ID')
        }
      }
    })
  }

  render() {
    const { ids, display, moreImg, url, showImagePicker } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">商品ID组</h4>
          <div className="content-data-goods-slider">
            <Search
              defaultValue={ids}
              placeholder="请输入商品id多个用,分开"
              enterButton="确认"
              onSearch={this.onItemsConfirm}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">商品信息</h4>
          <div className="content-data-goods-slider">
            <Group options={plainOptions} defaultValue={display} onChange={this.onDisplyaChange} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">配置更多</h4>
          <div className="content-data-goods-slider">
            <div className="more">
              <h4>图片</h4>
              <div className="imager-content">
                <img src={moreImg || defaultImg} alt="单张图片" />
                <div onClick={this.openImagePicker} className="imager-content-mask"><Icon type="edit" /></div>
              </div>
              <h4>链接</h4>
              <Linker url={url} multiGoods={false} onChange={this.onLinkerChange} />
            </div>
          </div>
        </div>
        <ImagePicker visible={showImagePicker} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default GoodsSliderDesign
