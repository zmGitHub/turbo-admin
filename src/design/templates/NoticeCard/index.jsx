import React from 'react'
import { Carousel } from 'antd'
import { getStyles } from '@/utils'

import './index.less'

const defaultItems = [
  { id: 'message_card_1', name: '最新消息' },
]

const NoticeCard = ({ style, data }) => {
  const items = data.items.length > 0 ? data.items : defaultItems
  return (
    <div className="x-template-notice">
      <div className="x-template-notice-header">
        <div className="name" style={getStyles(style, ['title'])}>{data.title}</div>
        <div className="divider">|</div>
      </div>
      <div className="x-template-notice-content">
        <Carousel dots={false} autoplay vertical>
          {
            items.map((item) => (
              <div key={item.id} className="x-template-notice-content-item">
                <span style={getStyles(style, ['message'])}>{item.name}</span>
              </div>
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}

export default NoticeCard
