import React, { PureComponent } from 'react';
import classnames from 'classnames'
import { includes } from 'ramda'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

const goodsArr = [
  {
    id: 'test',
    title: '产品标题',
    desc: '产品描述',
    src: '',
    price: 8888
  }
]

const IMAGE_FORAMT = '?x-oss-process=image/resize,m_fill,w_200,h_200/format,png'

class GoodsSlider extends PureComponent {

  renderPriceSection = ({ itemType, price, display, originPrice }) => {
    const isIntegral = +itemType === 5
    if (!isIntegral) return (
      <div className={classnames('price-wrap', { hide: !includes('price', display) })}>
        <div className={classnames('price', { hide: !includes('price', display) })}>¥{price}</div>
      </div>
    )
    return (
      <div className={classnames('price-wrap', { hide: !includes('price', display) })}>
        <div className={classnames('price')}>{price * 100}积分</div>
        <div className="origin-price">{+originPrice ? `市场价${(+originPrice)}` : ' '}</div>
      </div>
    )
  }

  render() {
    const { componentStyle, data: { display, items, moreImg } } = this.props
    const goodsItems = items.length > 0 ? items : goodsArr
    return (
      <div className="x-goods-slider" style={getStyles(componentStyle, ['margin'])}>
        {
          goodsItems.map(({ id, title, desc, src, price, type: itemType, originPrice }) => (
            <div key={id} className="x-goods-slider-item">
              <div className="header">
                <img className="img" src={`${src ? `${src}${IMAGE_FORAMT}` : defaultImg}`} alt="商品图片" />
              </div>
              <div className="content">
                <div className={classnames('title', { hide: !includes('title', display) })}>{title}</div>
                <div className={classnames('desc', { hide: !includes('desc', display) })}>{desc}</div>
              </div>
              {this.renderPriceSection({ itemType, price, originPrice, display })}

            </div>
          ))
        }
        <div key="more" className="x-goods-slider-more">
          <img className="img" src={moreImg ? `${moreImg}${IMAGE_FORAMT}` : defaultImg} alt="商品图片" />
          <div className="desc">查看更多</div>
        </div>
      </div>
    );
  }
}


export default GoodsSlider
