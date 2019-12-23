import React, { PureComponent } from 'react';
import classnames from 'classnames'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

const goodsArr = [
  {
    id: 'test',
    name: '产品标题',
    desc: '产品描述',
    src: '',
    price: 1998
  }
]

const IMAGE_FORAMT = {
  // full-全屏, half-半屏,fulll-全屏左侧, fullr-全屏右侧
  full: '?x-oss-process=image/resize,m_fill,w_375,h_158/format,png',
  half: '?x-oss-process=image/resize,m_fill,w_171,h_171/format,png',
  fulll: '?x-oss-process=image/resize,m_fill,w_175,h_175/format,png',
  fullr: '?x-oss-process=image/resize,m_fill,w_175,h_175/format,png'
}

class GoodsCard extends PureComponent {

  renderPriceSection = ({ itemType, price, originPrice }) => {
    const isIntegral = +itemType === 5
    // const state = this.state
    if (!isIntegral) return <div className="price-wrap"><div className="price">¥{price}</div></div>
    return (
      <div className="price-wrap">
        <div className="price">{price * 100}积分</div>
        <div className="origin-price">{+originPrice ? `市场价${(+originPrice)}` : ' '}</div>
      </div>
    )
  }

  render() {
    const { componentStyle, data: { items, type, buyButton } } = this.props
    const cardStyle = classnames('x-goods-card', type)
    const buyButtonStyle = classnames('btn', { hide: !buyButton })
    const goodsItems = items.length > 0 ? items : goodsArr
    return (
      <div className={cardStyle} style={getStyles(componentStyle, ['margin'])}>
        {
          goodsItems.map(({ id, title, name, desc, src, price, type: itemType, originPrice }, index) => (
            <div key={`${id}_${index}_goods_card`} className="googs-card-item">
              <div className="header">
                <img className="img" src={`${src ? `${src}${IMAGE_FORAMT[type]}` : defaultImg}`} alt="商品图片" />
              </div>
              <div className="content">
                <div className="left">
                  <div className="title">{title || name}</div>
                  <div className={classnames('desc', { hide: !desc })}>{desc}</div>
                </div>
                <div className="right">
                  {this.renderPriceSection({ itemType, price, originPrice })}
                  <div className={buyButtonStyle}>立即{+itemType === 5 ? '兑换' : '购买'}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}


export default GoodsCard
