import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva'
import { Layout, Icon, message, Spin, Empty, Statistic, Button } from 'antd'
import classnames from 'classnames'
import { getPageQuery } from '@/utils'
import LazyTemplate from './template'

const { Countdown } = Statistic;
const { Sider } = Layout;

@connect(({ o2o, loading }) => ({
  current: o2o.timing,
  list: o2o.histories,
  loading: loading.effects['o2o/getDesignHistory']
}))
class SiderLeft extends PureComponent {
  static defaultProps = {
    active: false
  }

  shopId = ''

  constructor(props) {
    super(props)
    this.state = {
      extend: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const query = getPageQuery()
    if (query && query.id) {
      this.shopId = query.id
      dispatch({
        type: 'o2o/getDesignHistory',
        payload: { shopId: query.id }
      })
      dispatch({
        type: 'o2o/getTiming',
        callback: (res) => {
          if (res && res.id) {
            this.setState({ extend: true })
          }
        }
      })
    } else {
      message.error('商家不存在');
    }
  }

  resetSiderStatus = () => {
    this.setState({ extend: '' })
  }


  rejectData = () => {
    const { dispatch, current } = this.props
    dispatch({
      type: 'o2o/reject',
      payload: { shopId: this.shopId, designId: current.id },
      callback: (res) => {
        if (res.code === -1) {
          message.info(res.msg)
        } else {
          message.success('拒绝成功')
        }
      }
    })
  }

  render() {
    const { extend } = this.state
    const { current, list, loading } = this.props
    const deadline = new Date(current.reservation)
    const designStyle = classnames('x-shop-sider-templates', { active: extend })
    return (
      <Fragment>
        <Sider className="x-shop-sider">
          <div className="x-shop-sider-scroll">
            <Spin tip="加载中..." spinning={loading}>
              <div className="x-shop-sider-scroll-header">
                <Icon type="ordered-list" />
                <span>历史模板</span>
              </div>
              <div className="x-shop-sider-scroll-content">
                {
                  list.length ? list.map((item) => (
                    <div key={item.id} className="template-item">
                      <img src="https://img.yzcdn.cn/upload_files/2018/01/15/FhAjr6LsipxUbv264H1idlrbb2i1.png?imageView2%2F2%2Fw%2F500%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp" alt="默认图片" />
                      <div className="template-item-info">
                        <div className="name">{item.name}</div>
                      </div>
                    </div>
                  )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
              </div>
            </Spin>
          </div>
          <Sider width="375" className={designStyle}>
            <div className="x-shop-sider-templates-content">
              <div className="template-header">
                <div className="template-header-timer">
                  <span>还有:</span>
                  <Countdown value={deadline} format="D 天 H 时 m 分 s 秒" />
                  <span>将应用此模板</span>
                </div>
                <div className="template-header-action">
                  <Button onClick={this.rejectData} type="primary">拒绝</Button>
                </div>
              </div>
              <div className="template-content">
                <div className="template-content-mobile">
                  <LazyTemplate templates={current.data} />
                </div>
              </div>
            </div>
          </Sider>
        </Sider>
      </Fragment>
    )
  }
}


export default SiderLeft
