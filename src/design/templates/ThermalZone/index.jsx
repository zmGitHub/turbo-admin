import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

class ThermalZone extends PureComponent {
  render() {
    const { style, data } = this.props
    return (
      <div className="x-template-thermal" style={getStyles(style, ['padding'])}>
        <img style={getStyles(style, ['img'])} src={data.src || defaultImg} alt="单张图片" draggable={false} />
      </div>
    );
  }
}

export default ThermalZone
