import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import classnames from 'classnames'
import SiderPanel from './sider'
import MobilePabel from './mobile'
import SettingPanel from './setting'

import './index.less'

const { Sider } = Layout

class Design extends PureComponent {

  state = {
    component: {
      style: [],
      content: {}
    },
    settingCollapse: false,
    templateCollapse: false
  }

  reset = (event) => {
    event.stopPropagation()
    this.setState({ settingCollapse: false, templateCollapse: false })
  }

  openTemplate = () => {
    this.setState({ templateCollapse: true })
  }

  getComponentSetting = (component) => {
    this.setState({ component, settingCollapse: true })
  }

  render() {
    console.warn('父组件 render......')
    const { component, settingCollapse, templateCollapse } = this.state
    const settingStyle = classnames('x-design-setting', { active: settingCollapse })
    const contentStyle = classnames('x-design-content-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    return (
      <div className="x-design">
        <SiderPanel onChange={this.openTemplate} active={templateCollapse} />
        <div onClick={this.reset} className="x-design-content">
          <div id="js-scroll-content" className={contentStyle}>
            <MobilePabel
              active={settingCollapse}
              onChange={this.getComponentSetting}
            />
          </div>
        </div>
        <Sider width="300" className={settingStyle}>
          <SettingPanel component={component} />
        </Sider>
      </div>
    );
  }
}

export default Design
