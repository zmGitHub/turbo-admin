import React from 'react';
import { Card } from 'antd'
import Mobile from './mobile'
import Setting from './setting'

import './edit.less'

const PosterEdit = ({ location }) => {
  console.log('渲染.......')
  return (
    <div className="x-poster">
      <div className="x-poster-content">
        <Card>
          <Mobile location={location} />
          <Setting />
        </Card>
      </div>
    </div>
  )
}

export default PosterEdit
