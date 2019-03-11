import React, { PureComponent } from 'react';
import { getStyles } from '@/utils'
import classnames from 'classnames'
import defaultImg from '@/static/images/x.png'
import './index.less'

const defaultItems = [
    {
    key: "navigation_1",
    src: defaultImg,
    url: "",
    text:"文本"}
]

class NavigationBar extends PureComponent {
  render() {

    const { componentStyle, data:{ items, lateralSwitch }} = this.props
    console.log(getStyles(componentStyle, ['title', 'margin']))
    const Navigationitems = items.length > 0 ? items : defaultItems
    const switchStatus = classnames({
      'x-template-navigationBar': !lateralSwitch,
      'x-template-navigationBarOne':lateralSwitch
    })
    return (
      <div className={switchStatus} style={getStyles(componentStyle, ['title', 'margin'])}>
        {
          Navigationitems.map((item) => (
            <div className='navigationBar-item' key={item.key}>
              <img className='navigationBar-item-img' src={item.src} alt="导航项图" />
              <div className='navigationBar-item-text'>
                {item.text}
              </div>
            </div>
            ))
            }
      </div>
    )
  }

}

export default NavigationBar
