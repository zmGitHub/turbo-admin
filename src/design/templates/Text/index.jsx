import React from 'react'
import { getStyles } from '@/utils'
import './index.less'

const Text = ({ key, style, data = { title: '标题文字' } }) => <div key={key} className='x-template-text' style={getStyles(style, ['title'])}>{data.title}</div>

export default Text
