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
      <div className='x-template-title'>
        <div className='left-title' style={getStyles(componentStyle, ['title'])}>{data.title}</div>
        <div className={moreStyle}>
          <div className='link'>更多</div>
          <div className='arrow'><Icon type="right" /></div>
        </div>
      </div>
    )
  }
}
export default Title
