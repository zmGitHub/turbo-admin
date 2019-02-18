import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class Image extends PureComponent {
  render() {
    const { style, data = { src: defaultImg } } = this.props
    return (
      <div className="x-template-img" style={getStyles(style, ['padding'])}>
        <img style={getStyles(style, ['img'])} src={data.src ? `${data.src}${format}` : defaultImg} alt="单张图片" draggable={false} />
      </div>
    );
  }
}

export default Image
