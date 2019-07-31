import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { getStyles } from '@/utils'
import templateShopImg from '@/static/images/pointShop.jpg'
import './index.less'
import { Icon } from 'antd'

class Title extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    const moreStyle = classnames('right-content', {
      hide: !data.moreSwitch
    })
    return (
      <div className='x-template-point-shop' style={getStyles(componentStyle, ['margin'])}>
        <img src={templateShopImg} alt="积分商城" />
      </div>
    )
  }
}
export default Title
