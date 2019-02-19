import React from 'react'
import SiderPanel from './sider'
import MobilePabel from './content'
import SettingPanel from './setting'

import './index.less'


const Design = ({ location }) => (
  <div className="x-design">
    <SiderPanel />
    <MobilePabel location={location} />
    <SettingPanel />
  </div>
)

export default Design
