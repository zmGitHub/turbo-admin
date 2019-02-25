import React, { PureComponent, Fragment } from 'react'
import { Input, message, Checkbox } from 'antd'
import { connect } from 'dva'
import { is, prop } from 'ramda'
import { debounce } from '@/utils'

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
    this.state = { data }
  }

  onDisplyaChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'display', value })
  }

  onInlineChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'inlineStyle', value })
  }

  onItemsConfirm = (itemIds) => {
    const { config: { id }, onChange, dispatch } = this.props
    dispatch({
      type: 'component/serviceData',
      payload: {
        path: 'design/product',
        itemIds
      },
      callback: (res) => {
        const data = prop('_DATA_', res)
        if (res && data) {
          console.log(data)
        } else {
          message.info('未找到商品, 请确认商品组ID')
        }
      }
    })
  }

  render() {
    const { data: { display } } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">商品ID组</h4>
          <div className="content-data-goods-slider">
            <Search
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
          <h4 className="content-data-title">更多</h4>
          <div className="content-data-goods-slider">
            sdf
          </div>
        </div>
      </Fragment>
    );
  }
}

export default GoodsSliderDesign
