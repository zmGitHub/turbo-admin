import React, { PureComponent } from 'react';
import { getStyles } from '@/utils'
import './index.less'

class NavigationBar extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    return (
      <div className='x-template-navigationBar'>
          <div className='x-template-navigationBar-item'>1</div>
          <div className='x-template-navigationBar-item'>1</div>
          <div className='x-template-navigationBar-item'>1</div>
          <div className='x-template-navigationBar-item'>1</div>
      </div>
    )
  }

}

export default NavigationBar
