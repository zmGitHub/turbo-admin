import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Pagination, Empty, Card, Icon, Spin, Button, Modal, DatePicker, message } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import classnames from 'classnames'
import CountDown from '@/components/CountDown'
import templateImg from '@/static/images/template.jpg'
import CreateTemplatesModal from './CreatForm'
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

  itemId = ''

  static defaultProps = {
    loading: false,
    dashboard: {
      total: 0,
      data: []
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      type: 'home',
      dateVisible: false,
      visible: false
    }
  }

  // 设置默认
  setDefaultTemplate(id) {
    const { dispatch } = this.props
    confirm({
      title: '确认设置该模板为默认吗?',
      content: '设置后小程序对应页面默认展示该模板',
      okText: '确认',
      okType: 'okType',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'dashboard/publishTemplate',
          payload: { id, isPublish: 1, isTiming: 0, timingTime: '' },
          callback: () => {
            message.success('设置默认成功')
            this.queryTemplate()
          }
        })
      }
    })
  }

  addTemplates = (event) => {
    event.preventDefault()
    this.setState({ visible: true })
  }

  createTemplatesCallback = (res) => {
    if (res) {
      this.setState({ visible: false, pageNo: 1 }, () => {
        this.queryTemplate()
      })
    } else {
      this.setState({ visible: false })
    }
  }

  queryTemplate = () => {
    const { dispatch } = this.props
    const { type, pageNo } = this.state
    dispatch({
      type: 'dashboard/getTemplates',
      payload: { type: typeMaps[type], pageNo, pageSize: 8 }
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

  // 选择日期
  openDateModal = (itemId) => {
    this.itemId = itemId
    this.setState({ dateVisible: true })
  }

  // 选择日期
  onDateChange = (date) => {
    if (date && date.format) {
      const { dispatch } = this.props
      const timingTime = date.format('YYYY-MM-DD HH:mm:ss')
      dispatch({
        type: 'dashboard/publishTemplate',
        payload: { id: this.itemId, isTiming: 1, timingTime },
        callback: () => {
          message.success('定时设置成功')
          this.queryTemplate()
        }
      })
    }
    this.setState({ dateVisible: false })
  }

    // 删除模板
    deleteTemlate(id) {
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
          data.map(({ id, name, isPublish, url, timingTime }) => (
            <div key={id} className={classnames('x-dashboard-content-body-list-item', { active: isPublish === 1 })}>
              <img src={url || templateImg} alt="官方模板" />
              <div className="template-modal">
                <Link
                  to={{
                    pathname: '/design',
                    search: `?id=${id}`,
                  }}
                >
                  <Button>编辑模板</Button>
                </Link>
                <Button onClick={() => { this.openDateModal(id) }}>定时发布</Button>
                <Button disabled={isPublish === 1} onClick={() => { this.setDefaultTemplate(id) }}>设为默认</Button>
                <Button onClick={() => { this.deleteTemlate(id) }}>删除模板</Button>
              </div>
              <div className="template-footer">{name}--{id}</div>
              {
                timingTime && (
                  <div className="template-timer">
                    <span>距离发布还有: </span>
                    <CountDown target={timingTime} />
                  </div>
                )
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
    const { type, pageNo, visible, dateVisible } = this.state
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
        <CreateTemplatesModal dispatch={dispatch} visible={visible} onChange={this.createTemplatesCallback} />
        <Modal
          width="280px"
          className="x-date-modal"
          onCancel={this.onDateChange}
          footer={null}
          visible={dateVisible}
        >
          <DatePicker
            locale={locale}
            showTime
            open
            getCalendarContainer={trigger => trigger.parentNode}
            onOk={this.onDateChange}
          />
        </Modal>
      </div>
    )
  }
}

export default Dashboard
