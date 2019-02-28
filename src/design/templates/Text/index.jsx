import React, { PureComponent } from 'react';
import { getStyles } from '@/utils'
import './index.less'

class Text extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    return (
      <div className='x-template-text' style={getStyles(componentStyle, ['title', 'margin'])}>{data.title}</div>
    );
  }
}


export default Text
