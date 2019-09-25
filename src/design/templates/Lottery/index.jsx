import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import templateLotteryImg from '@/static/images/lottery.png'
import './index.less'

class Lottery extends PureComponent {

  render() {
    const { componentStyle, data: { backgroundColor, src } } = this.props
    const styles = getStyles(componentStyle, ['margin'])
    if (src) {
      styles.backgroundImage = `url(${src})`
    } else {
      styles.backgroundColor = backgroundColor
    }
    return (
      <div className='x-template-lottery' style={styles}>
        <img src={templateLotteryImg} alt="转盘抽奖" />
        <div className='tip'>小程序端尚未实现转盘抽奖,目前该项只对app、h5生效</div>
      </div>
    )
  }
}
export default Lottery
