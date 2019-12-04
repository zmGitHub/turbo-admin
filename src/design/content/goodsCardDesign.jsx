import React, { PureComponent, Fragment } from 'react'
import { Input, Switch, Radio, Collapse, message, Spin, Icon } from 'antd'
import { connect } from 'dva'
import { head, last, prop, concat, update, trim, remove, reduce, maxBy } from 'ramda'
import ImagePicker from '@/components/ImagePicker'
import { formatGoodName, formatPrice } from '@/utils'
import defaultImg from '@/static/images/x.png'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const { Search, TextArea } = Input
const { Panel } = Collapse

const HeaderItem = ({ index, name, onClick }) => (
  <div className="goods-card-item-header">
    <div className="title">{name}</div>
    <div className="actions" data-index={index} onClick={onClick}>
      <Icon type="delete" />
    </div>
  </div>
)

@connect()
class GoodsCardDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    const { items, buyButton, type } = data
    this.state = {
      items,
      type,
      buyButton,
      goodsIndex: '',
      searching: false
    }
  }

  onImageChange = (images) => {
    const { onChange, config: { id } } = this.props
    if (images && images.length) {
      const imgItem = last(images)
      const { goodsIndex, items } = this.state
      const goods = items[goodsIndex]
      goods.src = imgItem.url
      const newItems = update(goodsIndex, goods, items)
      this.setState({ goodsIndex: '', items: newItems }, () => {
        onChange({ id, key: 'items', value: items })
      })
    } else {
      this.setState({ goodsIndex: '' })
    }
  }

  openImagePicker = ({ currentTarget: { dataset } }) => {
    this.setState({ goodsIndex: dataset.index })
  }

  onItemsChange = () => {
    const { onChange, config: { id } } = this.props
    const { items } = this.state
    onChange({ id, key: 'items', value: items })
  }

  onBuyButtonChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'buyButton', value })
  }

  onTypeChange = (e) => {
    const { onChange, config: { id } } = this.props
    const type = e.target.value
    this.setState({ type }, () => {
      onChange({ id, key: 'type', value: type })
    })
  }

  // 商品标题/描述改变
  onGoodsAttrChange = ({ target }) => {
    const { value, dataset } = target
    const { items } = this.state
    const { onChange, config: { id } } = this.props
    const goods = items[dataset.index]
    goods[dataset.type] = trim(value)
    const newItems = update(dataset.index, goods, items)
    this.setState({ items: newItems }, () => {
      onChange({ id, key: dataset.type, value: newItems })
    })
  }

  // 删除商品
  deleteGoods = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { items } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, items)
    this.setState({ items: newItems }, () => {
      onChange({ id, key: 'items', value: newItems })
    })
  }

  addItem = (itemIds) => {
    const { dispatch } = this.props
    this.setState({ searching: true })
    dispatch({
      type: 'component/serviceData',
      payload: {
        path: 'design/item-card',
        itemIds
      },
      callback: (res) => {
        const data = prop('_DATA_', res)
        if (res && data) {
          const goods = head(data)
          const { mainImage, name, highPrice, type } = prop('item', goods)
          const skus = prop('skus', goods)
          const originPriceSku = reduce(maxBy((sku) => prop('originPrice', sku.extraPrice) || 0), {}, skus)
          const originPrice = prop('originPrice', originPriceSku.extraPrice) || 0

          // if (skus.length) {

          // }
          const newItems = [{
            id: itemIds,
            name: formatGoodName(name),
            src: mainImage,
            desc: '',
            price: formatPrice(highPrice),
            originPrice: formatPrice(originPrice),
            type,
          }]
          this.setState(({ items }) => ({
            searching: false,
            items: concat(items, newItems)
          }), () => {
            this.onItemsChange()
          })
        } else {
          this.setState({ searching: false })
          message.info('未找到商品, 请确认商品是否存在')
        }
      }
    })
  }

  render() {
    const { buyButton, type, goodsIndex, items, searching } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">商品列表</h4>
          <div className="content-data-goods-card">
            <Spin spinning={searching}>
              <Collapse bordered={false}>
                {
                  items.map((item, index) => (
                    <Panel key={item.id} header={<HeaderItem name={item.title || item.name} onClick={this.deleteGoods} index={index} />}>
                      <div className="goods-card-item-panel">
                        <div className="input-content">
                          <div className="input-content-label">主图:</div>
                          <div className="imager-content">
                            <img src={item.src || defaultImg} alt="单张图片" />
                            <div data-index={index} onClick={this.openImagePicker} className="imager-content-mask"><Icon type="edit" /></div>
                          </div>
                        </div>
                        <div className="input-content">
                          <div className="input-content-label">标题:</div>
                          <TextArea data-index={index} data-type="title" onChange={this.onGoodsAttrChange} autosize defaultValue={item.name} placeholder="请输入商品名称" />
                        </div>
                        <div className="input-content">
                          <div className="input-content-label">描述:</div>
                          <TextArea data-index={index} data-type="desc" onChange={this.onGoodsAttrChange} autosize defaultValue={item.desc} placeholder="请输入商品描述" />
                        </div>
                      </div>
                    </Panel>
                  ))
                }
              </Collapse>
              <Search
                type="number"
                placeholder="请输入商品 id"
                enterButton="添加"
                onSearch={this.addItem}
              />
            </Spin>

          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">是否显示购买按钮</h4>
          <div className="content-data-goods-card margin-l-10">
            <Switch defaultChecked={buyButton} onChange={this.onBuyButtonChange} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">卡片类别</h4>
          <div className="content-data-goods-card margin-l-10">
            <RadioGroup onChange={this.onTypeChange} value={type} size="small">
              <RadioButton value="full">整屏</RadioButton>
              <RadioButton value="half">半屏</RadioButton>
              <RadioButton value="fulll">整屏左侧图片</RadioButton>
              <RadioButton value="fullr">整屏右侧图片</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <ImagePicker visible={!!goodsIndex} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default GoodsCardDesign
