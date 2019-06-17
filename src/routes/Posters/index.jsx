import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Pagination, Empty, Card, Icon, Spin, Button, Modal, message } from 'antd'
import classnames from 'classnames'
import Countdown from '@/components/CountDown'
import templateImg from '@/static/images/template.jpg'
import CreateTemplatesModal from './Components/createForm'
import PublishTemplateModal from './Components/publishForm'

import './index.less'


const { confirm } = Modal

const templateType = [{
  key: 'home',
  tab: '首页海报',
}, {
  key: 'activity',
  tab: '活动海报',
}, {
  key: 'goods',
  tab: '商品海报',
}];

const typeMaps = {
  'home': '1',
  'activity': '2',
  'goods': '3'
}


@connect(({ poster, loading }) => ({
  poster,
  loading: loading.effects['poster/getPosterList']
}))
class Poster extends PureComponent {

  static defaultProps = {
    loading: false,
    poster: {
      tab: 'home',
      total: 0,
      data: []
    }
  }

  constructor(props) {
    super(props)
    const { poster: { tab } } = this.props
    this.state = {
      item: {},
      pageNo: 1,
      type: tab,
      publish: false,
      create: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props
    if (nextProps.location.pathname !== location.pathname) {
      this.setState({ type: 'home' })
    }
  }

  editTemplate = ({ currentTarget }) => {
    const { index } = currentTarget.dataset
    const { poster: { data } } = this.props
    if (data[index]) {
      const { id, name, type } = data[index]
      this.setState({ create: true, item: { id, name, type } })
    } else {
      message.warning('海报不存在')
    }
  }

  addTemplates = (event) => {
    event.preventDefault()
    this.setState({ create: true })
  }

  onTemplateEdit = (values) => {
    if (values) {
      const { dispatch, location } = this.props
      const { pathname } = location
      const shopId = pathname === '/dashboard/posters/o2o' ? -1 : 1
      const payload = values
      if (!values.id) {
        payload.shopId = shopId
      }
      dispatch({
        type: values.id ? 'poster/update':'poster/create',
        payload,
        callback: (res) => {
          if (res) {
            this.setState({ item: {}, create: false, pageNo: 1 }, () => {
              this.queryTemplate()
            })
          } else {
            message.warn(res.message || '海报创建失败, 请重试!')
          }
        }
      })
    } else {
      this.setState({ item: {}, create: false })
    }
  }

  queryTemplate = () => {
    const { dispatch, location } = this.props
    const { type, pageNo } = this.state
    const { pathname } = location
    const shopId = pathname === '/dashboard/posters/o2o' ? -1 : 1
    dispatch({
      type: 'poster/getPosterList',
      payload: { tab: type, type: typeMaps[type], pageNo, pageSize: 8, shopId }
    })
  }

  onTabChange = (type) => {
    this.setState({ type }, () => {
      this.queryTemplate()
    })
  }

  // 切换分页
  onPageChange = (pageNo) => {
    this.setState({ pageNo }, () => {
      this.queryTemplate()
    })
  }

  // 发布海报
  publish = ({ currentTarget }) => {
    const { id, type } = currentTarget.dataset
    this.setState({ publish: true, item: { id, type } })
  }

  onPublishChange = (params) => {
    const { dispatch, location } = this.props
    const { item } = this.state
    if (params) {
      const { pathname } = location
      const shopId = pathname === '/dashboard/posters/o2o' ? -1 : 1
      dispatch({
        type: 'poster/publish',
        payload: { ...item, ...params, shopId },
        callback: () => {
          message.success('发布成功')
          this.setState({ publish: false, item: {} }, () => {
            this.queryTemplate()
          })
        }
      })
    } else {
      this.setState({ publish: false, item: {} })
    }
  }

  // 删除海报
  deleteTemlate = ({ currentTarget }) => {
    const { id } = currentTarget.dataset
    const { dispatch } = this.props
    confirm({
      title: '确认删除该海报吗?',
      content: '删除后不可恢复',
      okText: '确认',
      okType: 'okType',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'poster/remove',
          payload: id,
          callback: () => {
            message.success('删除海报成功!')
            this.queryTemplate()
          }
        })
      }
    })
  }

  renderItem = () => {
    const { poster: { data } } = this.props
    return (
      <div className="x-poster-list-content-body-list">
        {
          data.map(({ id, name, type, isDefault, poster, isTiming, timingTime, canPublish }, index) => (
            <div key={id} className={classnames('x-poster-list-content-body-list-item', { active: isDefault })}>
              <img src={poster || templateImg} alt="官方海报" />
              { isDefault ? (<div className="triangle"><Icon type="check-circle" /></div>) : null }
              <div className="template-modal">
                { canPublish && !isDefault ? (<Button data-id={id} data-type={type} onClick={this.publish}>发布海报</Button>) : null }
                <Link
                  to={{
                    pathname: '/dashboard/posters/edit',
                    search: `?id=${id}`,
                  }}
                >
                  <Button>编辑海报</Button>
                </Link>
                <Button data-index={index} onClick={this.editTemplate}>修改信息</Button>
                { isTiming ? <Button data-id={id} onClick={this.canclePublish}>取消定时</Button> : null }
                { !isDefault ? <Button data-id={id} onClick={this.deleteTemlate}>删除海报</Button> : null }
              </div>
              <div className="template-footer">{id}-{name}</div>
              {
                isTiming ? (
                  <div className="template-timer">
                    <span>距离发布还有: </span>
                    <Countdown target={timingTime} onEnd={this.queryTemplate} />
                  </div>
                ) : null
              }
            </div>
          ))
        }
      </div>
    )
  }

  renderEmpty = () => (
    <div className="x-poster-list-content-body-empty">
      <Empty
        description={<span>当前分类下还没有海报</span>}
      >
        <Button onClick={this.addTemplates} type="primary">立即创建</Button>
      </Empty>
    </div>
  )

  render() {
    const { loading, poster: { data, total }, dispatch } = this.props
    const { type, pageNo, create, item, publish } = this.state
    return (
      <div className="x-poster-list">
        <div className="x-poster-list-content">
          <Card
            className="x-poster-list-content-body"
            tabList={templateType}
            activeTabKey={type}
            onTabChange={this.onTabChange}
            bordered={false}
            extra={<a className="add-template" href="#" onClick={this.addTemplates}><Icon type="plus" />添加海报</a>}
          >
            <Spin spinning={loading}>
              { data.length > 0 ? this.renderItem() : this.renderEmpty() }
              <div className="x-poster-list-content-body-pager">
                <Pagination defaultPageSize={8} onChange={this.onPageChange} current={pageNo} total={total} />
              </div>
            </Spin>
          </Card>
        </div>
        <CreateTemplatesModal type={type} item={item} dispatch={dispatch} visible={create} onChange={this.onTemplateEdit} />
        <PublishTemplateModal item={item} visible={publish} onChange={this.onPublishChange} />
      </div>
    )
  }
}

export default Poster
