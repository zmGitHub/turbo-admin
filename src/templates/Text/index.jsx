import React from 'react'
import { getStyles } from '@/utils'
import './index.less'

const Text = ({ style, data = { title: '标题文字' } }) => (
  <div className='x-template-text' style={getStyles(style, ['title'])}>{data.title}</div>
)

export default Text
