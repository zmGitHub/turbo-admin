import React, { PureComponent } from 'react';
import { getStyles } from '@/utils'
import './index.less'

const defaultTabs = [
  {
    key: 'demo_1',
    name: '标签1'
  },
  {
    key: 'demo_2',
    name: '标签2'
  }
]

class Tabs extends PureComponent {
  render() {
    const { componentStyle, data: { border, items } } = this.props
    const tabItems = items.length ? items : defaultTabs
    const tabItemsStyle = ['tabItemStyle']
    const tabItemActiveStyle = border ? ['tabItemStyle', 'tabBorder', 'tabItemActiveStyle'] : ['tabItemStyle', 'tabItemActiveStyle']
    return (
      <div className='x-template-tabs' style={getStyles(componentStyle, ['tabStyle', 'margin'])}>
        {
          tabItems.map(({ key, name }, index) => (
            <div
              key={key}
              className="x-template-tabs-item"
              style={getStyles(componentStyle, index === 0 ? tabItemActiveStyle : tabItemsStyle)}
            >
              {name}
            </div>
          ))
        }
      </div>
    );
  }
}


export default Tabs
