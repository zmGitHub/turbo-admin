import React, { PureComponent, Fragment } from 'react'
import { Layout } from 'antd'
import classnames from 'classnames'

import './index.less'

const { Content, Sider } = Layout;

export default class Dashboard extends PureComponent {
  state = {
    templateCollapse: false,
    settingCollapse: false,
  }

  chooseModule = () => {
    this.setState({ templateCollapse: true })
  }

  reset = () => {
    console.log(888)
    this.setState({ templateCollapse: false, settingCollapse: false })
  }

  openSetting = (e) => {
    console.log(777)
    e.stopPropagation();
    this.setState({ settingCollapse: true })
  }

  render() {
    const { templateCollapse, settingCollapse } = this.state
    const designStyle = classnames('x-design-templates', { active: templateCollapse })
    const contentStyle = classnames('x-design-content-panel-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    const settingStyle = classnames('x-design-setting', { active: settingCollapse })
    console.log(settingStyle)
    console.log(settingCollapse)
    return (
      <Fragment>
        <Sider onClick={this.chooseModule} className="x-design-modules">
          模板集合
        </Sider>
        <Sider width="375" className={designStyle}>
          m模板列表
        </Sider>
        <Content className="x-design-content">
          <div onClick={this.reset} className="x-design-content-panel">
            <div onClick={this.openSetting} className={contentStyle}>
              装修区域
            </div>
          </div>
        </Content>
        <Sider width="300" className={settingStyle}>
          参数配置
        </Sider>
      </Fragment>
    )
  }
}
