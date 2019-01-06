import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { Card, Icon } from 'antd'
import templateImg from '@/static/images/template.jpg'
import './index.less'


const templateType = [{
  key: 'home',
  tab: '首页模板',
}, {
  key: 'activity',
  tab: '活动模板',
}, {
  key: 'personal',
  tab: '专区模板',
}];

export default class Dashboard extends PureComponent {
  state = {
    type: 'home'
  }

  onTabChange = (type) => {
    this.setState({ type })
  }

  render() {
    const { type } = this.state
    return (
      <div className="x-dashboard">
        <div className="x-dashboard-content">
          <Card
            className="x-dashboard-content-body"
            tabList={templateType}
            activeTabKey={type}
            onTabChange={(key) => { this.onTabChange(key); }}
            bordered={false}
          >
            <div className="x-dashboard-content-body-list">
              <div className="x-dashboard-content-body-list-item">
                <img src={templateImg} alt="官方模板" />
                <div className="template-footer">
                  <Link to="/design"><Icon type="form" /></Link>
                  <Link to="/design"><Icon fill="#f04134" type="delete" /></Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
