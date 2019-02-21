import React, { PureComponent } from 'react';
import { startsWith } from 'ramda'
import { getStyles } from '@/utils'
import './index.less'

const imgFormat = '?x-oss-process=image/resize,m_fixed,w_375,/interlace,1'

class Coupon extends PureComponent {
  render() {
    const { componentStyle, data: { type, height = '120px', background = '#fff' } } = this.props
    // 合并最外层的样式
    const contentStyle = {
      height,
      ...getStyles(componentStyle, ['margin'])
    }
    if (!startsWith('//', background)) {
      contentStyle.backgroundColor = background
    } else {
      contentStyle.backgroundImage = `url(${background}${imgFormat})`
    }

    return (
      <div className='x-coupon-card' style={contentStyle}>
        <div className="x-coupon-card-content" style={getStyles(componentStyle, ['input'])}>
          <div className="x-coupon-card-content-input">
            {
              type === 1 ? '请输入口令':'请输入手机号'
            }
          </div>
          <div className="x-coupon-card-content-btn">领劵</div>
        </div>
      </div>
    );
  }
}


export default Coupon
