import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { getStyles } from '@/utils'
import './index.less'
import { Icon } from 'antd'

class Title extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    const moreStyle = classnames('right-content', {
      hide: !data.moreSwitch
    })
    return (
      <div className='x-template-title' style={getStyles(componentStyle, ['title', 'margin'])}>
        <div className='left-title'>{data.title}</div>
        <div className={moreStyle}>
          <div className='x-template-title-link'>更多</div>
          <div className='x-template-title-arrow'><Icon type="right" /></div>
        </div>
      </div>
    )
  }
}
export default Title
