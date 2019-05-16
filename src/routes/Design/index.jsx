import React from 'react'
import SiderPanel from './sider'
import MobilePanel from './content'
import SettingPanel from './setting'

import './index.less'


const Design = ({ location }) => (
  <div className="x-design">
    <SiderPanel />
    <MobilePanel location={location} />
    <SettingPanel />
  </div>
)

export default Design
