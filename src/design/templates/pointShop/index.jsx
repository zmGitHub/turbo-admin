import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { getStyles } from '@/utils'
import templateShopImg from '@/static/images/pointShop.jpg'
import './index.less'
import { Icon } from 'antd'

class PointShop extends PureComponent {

  renderTip = () => {
    return (
      <div className='tip'>小程序端尚未实现积分商城,目前该项只对app、h5生效</div>
    )
  }

  render() {
    const { componentStyle, data, component } = this.props
    return (
      <div className='x-template-point-shop' style={getStyles(componentStyle, ['margin'])}>
        <img src={templateShopImg} alt="积分商城" />
        {component && this.renderTip()}
      </div>
    )
  }
}
export default PointShop
