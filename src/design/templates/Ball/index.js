import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

// const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class Image extends PureComponent {
  render() {
    const { componentStyle, data: { image } } = this.props
    const imgStyle = getStyles(componentStyle, ['img'])
    return (
      <div className="x-template-ball">
        <img style={{ ...imgStyle }} src={image || defaultImg} alt="悬浮球" draggable={false} />
      </div>
    );
  }
}

export default Image
