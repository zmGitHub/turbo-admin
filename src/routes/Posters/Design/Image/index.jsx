import React, { PureComponent } from 'react';
import defaultImg from '@/static/images/x.png'
import './index.less'


class Text extends PureComponent {
  render() {
    const { data } = this.props
    const { width, height, url } = data
    return (
      <img src={url || defaultImg} className="x-poster-img" style={{ width, height }} alt="图片" />
    );
  }
}


export default Text
