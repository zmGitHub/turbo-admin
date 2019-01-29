import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Pagination, Empty, Card, Icon, Spin, Button, Popconfirm } from 'antd'
import templateImg from '@/static/images/template.jpg'
import CreateTemplatesModal from './CreatForm'
import './index.less'


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
      total: 0,
      data: []
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      type: 'home',
      visible: false
    }
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

  renderItem = () => {
    const { dashboard: { data } } = this.props
    return (
      <div className="x-dashboard-content-body-list">
        {
          data.map(({ id, updatedAt }) => (
            <div key={id} className="x-dashboard-content-body-list-item">
              <img src={templateImg} alt="官方模板" />
              <div className="template-modal">
                <div className="template-modal-item">定时</div>
                <Popconfirm title="确认设置当前模板为默认模板?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                  <div className="template-modal-item">默认</div>
                </Popconfirm>
                <div className="template-modal-item">编辑</div>
                <div className="template-modal-item">删除</div>
              </div>
              <div className="template-footer">{updatedAt}</div>
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
        <Button>立即创建</Button>
      </Empty>
    </div>
  )

  onTabChange = (type) => {
    this.setState({ type })
  }

  // 切换分页
  onPageChange = (pageNo) => {
    this.setState({ pageNo }, () => {
      this.queryTemplate()
    })
  }

  render() {
    const { loading, dashboard: { data, total }, dispatch } = this.props
    const { type, pageNo, visible } = this.state
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
      </div>
    )
  }
}

export default Dashboard
