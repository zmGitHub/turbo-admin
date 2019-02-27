import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

class ThermalZone extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    return (
      <div className="x-template-thermal" style={getStyles(componentStyle, ['margin'])}>
        <img style={getStyles(componentStyle, ['img'])} src={data.src || defaultImg} alt="单张图片" draggable={false} />
      </div>
    );
  }
}

export default ThermalZone
