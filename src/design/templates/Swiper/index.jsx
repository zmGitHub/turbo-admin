import React, { PureComponent } from 'react'
import { Carousel } from 'antd'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'

import './index.less'

const defaultItems = [
  { key: 'swiper_1', src: defaultImg }
]
const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class Swiper extends PureComponent {
  render() {
    const { style, data } = this.props
    const items = data.items.length > 0 ? data.items : defaultItems
    return (
      <Carousel autoplay className="x-template-swiper">
        {
          items.map((item) => (
            <div key={item.key} className="x-template-swiper-item">
              <img style={getStyles(style, ['img'])} src={item.src ? `${item.src}${format}` : defaultImg} alt="轮播图" draggable={false} />
            </div>
          ))
        }
      </Carousel>
    );
  }
}

export default Swiper
