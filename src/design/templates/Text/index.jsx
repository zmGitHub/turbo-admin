import React, { PureComponent } from 'react';

import { getStyles } from '@/utils'
import './index.less'


class Text extends PureComponent {
  constructor(props) {
    super(props)
    console.log(this.props)
    const { style, data } = this.props
    this.state = {
      comonentStyle: getStyles(style, ['title']),
      data
    }
  }


  componentWillMount() {
    // 监听数据变化
    window.ee.on('COMPONENT_CONFIG_UPDATE', this.onConfigChange)
  }

  componentWillUnmount() {
    window.ee.off('COMPONENT_CONFIG_UPDATE', (res) => {
      console.log('删除监听事件')
      console.log(res)
    })
  }

  onConfigChange = (res) => {
    const { comonentStyle } = this.state
    const style = {
      ...comonentStyle,
      fontSize: res.value
    }
    this.setState({ comonentStyle: style })
  }

  render() {
    const { comonentStyle, data } = this.state
    console.log('更新了');
    console.log(comonentStyle)
    return (
      <div className='x-template-text' style={comonentStyle}>{data.title}</div>
    );
  }
}


export default Text
