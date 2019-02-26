import React, { PureComponent  } from 'react';
import { Button } from 'antd'
import classnames from 'classnames';
import GoodsPicker from '@/components/GoodsPicker'
import CouponsPicker from '@/components/CouponsPicker'
import PageForm from './PageForm'

import './index.less'

const MAPS = {
  '/pages/goods': '跳转商品',
  '/pages/index': '跳转首页',
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
  onTypeChange = (event) => {
    const { currentTarget } = event
    const type = currentTarget.getAttribute('data-type')
    this.setState({ type })
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
    const { multiGoods, multiCoupons } = this.props
    const linkerStyle = classnames('x-linker-panel', { active: type === 'pages' })
    const chooseStyle = classnames('x-linker-footer', { active: !!url.page })
    return (
      <div className="x-linker">
        <div className="x-linker-btns">
          <Button onClick={this.onTypeChange} data-type="goods" icon="shopping">商 品</Button>
          <Button onClick={this.onTypeChange} data-type="pages" icon="link">页 面</Button>
          <Button onClick={this.onTypeChange} data-type="coupons" icon="gift">优惠券</Button>
        </div>
        <div className={chooseStyle}>
          <span>已选择: {MAPS[url.page]}</span>
          (<strong>{url.query}</strong>)
        </div>
        <div className={linkerStyle}>
          <PageForm onChange={this.onPropsChange} />
        </div>
        <GoodsPicker multiGoods={multiGoods} onChange={this.onPropsChange} visible={type === 'goods'} />
        <CouponsPicker multiCoupons={multiCoupons} onChange={this.onPropsChange} visible={type === 'coupons'} />
      </div>
    );
  }
}

export default Linker
