import React from 'react'
import { getStyles } from '@/utils'
import './index.less'

const Text = ({ title = '测试', style }) => (
  <div className='x-template-text' style={getStyles(style, ['title'])}>{title}</div>
)

export default Text
