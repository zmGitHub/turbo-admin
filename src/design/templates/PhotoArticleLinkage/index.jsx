import React, { PureComponent } from 'react'
import { Carousel } from 'antd'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import moment from 'moment'

import './index.less'

const defaultItems = [
  { key: 'photoArticleLinkage_1', src: defaultImg,name: '标题' }
]
// const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class PotoArticleLinkage extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    const items = data.items.length > 0 ? data.items : defaultItems
    const imgHeight = parseInt(getStyles(componentStyle, ['img']).height,10) - 84
    const imgHeightValue = `${String(imgHeight)}px`
    return (
      <div className="x-template-photoArticleLinkage" style={getStyles(componentStyle, ['img','margin'])}>
        <Carousel autoplay>
          {
            items.map((item, index) => (
              <div key={`${item.key}_article_${index}`} className="x-template-photoArticleLinkage-item">
                <img className="x-template-photoArticleLinkage-item-img" src={item.mainImage || defaultImg} alt="轮播图" draggable={false} style={{height: imgHeightValue }}/>
                <div className="x-template-photoArticleLinkage-content">
                  <div className="x-template-photoArticleLinkage-content-title">
                    {item.name}
                  </div>
                  <div className="x-template-photoArticleLinkage-content-time">
                    {moment(item.createdAt).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
            ))
          }
        </Carousel>

      </div>

    );
  }
}

export default PotoArticleLinkage
