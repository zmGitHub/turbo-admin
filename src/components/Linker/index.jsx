import React, { PureComponent  } from 'react';
import { Radio } from 'antd'
import classnames from 'classnames';

import GoodsPicker from '@/components/GoodsPicker'
import PageForm from './PageForm'

import './index.less'

const { Group } = Radio

/**
 *
 */

const MAPS = {
  '/pages/goods': '跳转商品',
  '/pages/index': '择跳转首页',
  '/pages/activity': '择跳转活动页',
  'coupons': '领取优惠券',
}

class Linker extends PureComponent {

  static defaultProps = {
    url: {
      page: '',
      query: ''
    }
  }

  constructor(props) {
    super(props)
    const { url } = this.props
    this.state = {
      url,
      type: ''
    }
  }

  // 类型改变
  onTypeChange = (e) => {
    this.setState({ type: e.target.value })
  }

  // 页面路径
  onPropsChange = (url) => {
    const { onChange } = this.props
    this.setState({ url, type: '' }, () => {
      onChange(url)
    })
  }

  render() {
    const { type, url } = this.state
    const linkerStyle = classnames('x-linker-panel', { active: type === 'pages' })
    return (
      <div className="x-linker">
        <Group onChange={this.onTypeChange} value={type}>
          <Radio value="goods">商 品</Radio>
          <Radio value="pages">页 面</Radio>
          <Radio value="coupons">优惠券</Radio>
        </Group>
        <div className="x-linker-footer">
          已选择: {MAPS[url.page]} : {url.query}
        </div>
        <div className={linkerStyle}>
          <PageForm onChange={this.onPropsChange} />
        </div>
        <GoodsPicker onChange={this.onPropsChange} visible={type === 'goods'} />
      </div>
    );
  }
}

export default Linker
