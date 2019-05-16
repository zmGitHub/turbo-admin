import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Pagination, Empty, Card, Icon, Spin, Button, Modal, message } from 'antd'
import classnames from 'classnames'
import Countdown from '@/components/CountDown'
import templateImg from '@/static/images/template.jpg'
import CreateTemplatesModal from './createForm'
import PublishTemplateModal from './publishForm'

import './index.less'


const { confirm } = Modal

const templateType = [{
  key: 'home',
  tab: '首页模板',
}, {
  key: 'activity',
  tab: '活动模板',
}, {
  key: 'personal',
  tab: '专区模板',
}];

const typeMaps = {
  'home': '1',
  'activity': '2',
  'personal': '3'
}


@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.effects['dashboard/getTemplates']
}))
class Dashboard extends PureComponent {

  static defaultProps = {
    loading: false,
    dashboard: {
      tab: 'home',
      total: 0,
      data: []
    }
  }

  constructor(props) {
    super(props)
    const { dashboard: { tab } } = this.props
    this.state = {
      item: {},
      pageNo: 1,
      type: tab,
      publish: false,
      create: false
    }
  }

  componentDidMount() {
    this.queryTemplate()
  }

  editTemplate = ({ currentTarget }) => {
    const { index } = currentTarget.dataset
    const { dashboard: { data } } = this.props
    if (data[index]) {
      const { id, name, type } = data[index]
      this.setState({ create: true, item: { id, name, type } })
    } else {
      message.warning('模板不存在')
    }
  }

  addTemplates = (event) => {
    event.preventDefault()
    this.setState({ create: true })
  }

  onTemplateEdit = (payload) => {
    if (payload) {
      const { dispatch } = this.props
      dispatch({
        type: payload.id ? 'design/edit':'design/create',
        payload,
        callback: (res) => {
          if (res) {
            this.setState({ create: false, pageNo: 1 }, () => {
              this.queryTemplate()
            })
          } else {
            message.warn(res.message || '模板创建失败, 请重试!')
          }
        }
      })
    } else {
      this.setState({ create: false })
    }
  }

  queryTemplate = () => {
    const { dispatch } = this.props
    const { type, pageNo } = this.state
    dispatch({
      type: 'dashboard/getTemplates',
      payload: { tab: type, type: typeMaps[type], pageNo, pageSize: 8 }
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

  // 取消模板发布
  canclePublish = ({ currentTarget }) => {
    const { id } = currentTarget.dataset
    const { dispatch } = this.props
    confirm({
      title: '确认取消发布该模板吗?',
      content: '取消后小程序对应页面将不可访问',
      okText: '确认',
      okType: 'okType',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'dashboard/canclePublish',
          payload: id,
          callback: () => {
            message.success('取消成功')
            this.queryTemplate()
          }
        })
      }
    })
  }

  // 发布模板
  publish = ({ currentTarget }) => {
    const { id, type } = currentTarget.dataset
    this.setState({ publish: true, item: { id, type } })
  }

  onPublishChange = (params) => {
    const { dispatch } = this.props
    const { item } = this.state
    if (params) {
      dispatch({
        type: 'dashboard/publishTemplate',
        payload: { ...item, ...params },
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

  // 设置模板为默认
  setDefault = ({ currentTarget }) => {
    const { id } = currentTarget.dataset
    const { dispatch } = this.props
    confirm({
      title: '确认设置该模板为默认吗?',
      content: '设置后小程序对应页面默认展示该模板',
      okText: '确认',
      okType: 'okType',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'dashboard/setDefaultTemplate',
          payload: id,
          callback: () => {
            message.success('设置成功')
            this.queryTemplate()
          }
        })
      }
    })
  }

  // 删除模板
  deleteTemlate = ({ currentTarget }) => {
    const { id } = currentTarget.dataset
    const { dispatch } = this.props
    confirm({
      title: '确认删除该模板吗?',
      content: '删除后不可恢复',
      okText: '确认',
      okType: 'okType',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'dashboard/removeTemplate',
          payload: id,
          callback: () => {
            message.success('删除模板成功!')
            this.queryTemplate()
          }
        })
      }
    })
  }

  renderItem = () => {
    const { dashboard: { data } } = this.props
    return (
      <div className="x-dashboard-content-body-list">
        {
          data.map(({ id, name, type, isDefault, poster, isTiming, timingTime }, index) => (
            <div key={id} className={classnames('x-dashboard-content-body-list-item', { active: isDefault })}>
              <img src={poster || templateImg} alt="官方模板" />
              { isDefault ? (<div className="triangle"><Icon type="check-circle" /></div>) : null }
              <div className="template-modal">
                <Button data-id={id} data-type={type} onClick={this.publish}>发布模板</Button>
                <Link
                  to={{
                    pathname: '/design/edit',
                    search: `?id=${id}`,
                  }}
                >
                  <Button>编辑模板</Button>
                </Link>
                <Button data-index={index} onClick={this.editTemplate}>修改信息</Button>
                { isTiming ? <Button data-id={id} onClick={this.canclePublish}>取消定时</Button> : null }
                { !isDefault ? <Button data-id={id} onClick={this.deleteTemlate}>删除模板</Button> : null }
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
    <div className="x-dashboard-content-body-empty">
      <Empty
        description={<span>当前分类下还没有模板</span>}
      >
        <Button onClick={this.addTemplates} type="primary">立即创建</Button>
      </Empty>
    </div>
  )

  render() {
    const { loading, dashboard: { data, total }, dispatch } = this.props
    const { type, pageNo, create, item, publish } = this.state
    return (
      <div className="x-dashboard">
        <div className="x-dashboard-content">
          <Card
            className="x-dashboard-content-body"
            tabList={templateType}
            activeTabKey={type}
            onTabChange={this.onTabChange}
            bordered={false}
            extra={<a className="add-template" href="#" onClick={this.addTemplates}><Icon type="plus" />添加模板</a>}
          >
            <Spin spinning={loading}>
              { data.length > 0 ? this.renderItem() : this.renderEmpty() }
              <div className="x-dashboard-content-body-pager">
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

export default Dashboard
