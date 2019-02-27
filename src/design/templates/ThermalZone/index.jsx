import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class ThermalZone extends PureComponent {
  render() {
    const { componentStyle, data: { src } } = this.props
    return (
      <div className="x-template-thermal" style={getStyles(componentStyle, ['margin'])}>
        <img style={getStyles(componentStyle, ['img'])} src={src ? `${src}${format}` : defaultImg} alt="单张图片" draggable={false} />
      </div>
    );
  }
}

export default ThermalZone
