import React from 'react'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'

import './index.less'

const Image = ({ style, data = { src: defaultImg } }) => (
  <div className="x-template-img" style={getStyles(style, ['padding'])}>
    <img style={getStyles(style, ['img'])} src={data.src || defaultImg} alt="单张图片" draggable={false} />
  </div>
)

export default Image
