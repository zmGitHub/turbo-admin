import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'
import './index.less'

// const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class Image extends PureComponent {
  render() {
    const { componentStyle, data: { src, height, channel } } = this.props
    const imgStyle = getStyles(componentStyle, ['live'])
    return (
      <div className="x-template-video" style={getStyles(componentStyle, ['margin'])}>
        <img style={{ ...imgStyle, height: `${height}px` }} src={src || defaultImg} alt="单张图片" draggable={false} />
        {/* <video src="live-show" style={{ ...imgStyle, height: `${height}px` }}  draggable={false} ></video> */}
      </div>
    );
  }
}

export default Image
