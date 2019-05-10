import React from 'react'
import './index.less'

export default () => (
  <div className="loader">
    <div className="loader-content">
      <div className="loader-content-circle" />
      <div className="loader-content-line-mask">
        <div className="loader-content-line" />
      </div>
      <div className="loader-content-desc">数据配置中...</div>
    </div>
  </div>
)
