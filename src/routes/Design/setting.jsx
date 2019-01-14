import React from 'react'
import { Collapse, Layout } from 'antd'
import classnames from 'classnames'

const { Panel } = Collapse
const { Sider } = Layout

const Setting = ({ active, config = {} }) => {
  const { key, content, style } = config
  const settingStyle = classnames('x-design-setting', { active })
  return (
    <Sider width="300" className={settingStyle}>
      <div className="x-design-setting-scroll">
        <Collapse className="x-design-setting-scroll-collapse" bordered={false} defaultActiveKey={['content']}>
          <Panel header="内容" key="content">
            <div className="module-content">asdf</div>
          </Panel>
          {
            style.map((item) => (
              <Panel key={item.key} header={item.name}>
                <div className="module-content">asdf</div>
              </Panel>
            ))
          }
        </Collapse>
      </div>

    </Sider>
  )
}

export default Setting
