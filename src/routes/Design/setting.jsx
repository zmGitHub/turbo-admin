// 右侧设置
import React, { Suspense, lazy, PureComponent } from 'react'
import { Layout, Collapse, Switch, Checkbox } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import ContentMaps from '@/design/content'
import EditorMaps from '@/design/editor'
import { getPageQuery } from '@/utils'

const { Sider } = Layout
const { Panel } = Collapse
const { Group } = Checkbox


const channelOptions = [
  { value: 6, label: '小程序' },
  { value: 5, label: 'H5端' },
  { value: 3, label: 'iOS端' },
  { value: 4, label: 'Android端' }
]

const defaultChannel = [6, 5, 3, 4];

const DynamicComponent = ({ onChange, config, maps }) => {
  const { component } = config
  const LoadComponent = maps[component] || maps.error
  const LazyComponent = lazy(() => LoadComponent)
  return (
    <LazyComponent config={config} onChange={onChange} />
  )
}

@connect()
class Setting extends PureComponent {
  constructor(props) {
    super(props)
    const { location } = props
    const { o2o }  = getPageQuery(location.search)
    this.state = {
      id: '',
      name: '',
      data: null,
      auth: false,
      o2o: !!o2o,
      componentStyle: [],
      channel: [],
    }
  }

  componentDidMount() {
    // 监听数据变化
    window.ee.on('GET_COMPONENT_DATA', this.setComponentData)
    window.ee.on('RESET_LAYOUT_STATUS', this.resetComponentData)
  }

  componentWillUnmount() {
    window.ee.off('GET_COMPONENT_DATA')
    window.ee.off('RESET_LAYOUT_STATUS')
  }

  resetComponentData = () => {
    this.setState({
      id: '',
      name: '',
      data: null,
      componentStyle: []
    })
  }

  setComponentData = (data) => {
    const { channel, ...rest } = data;
    this.setState({ ...rest, channel: channel || defaultChannel })
  }

  // 更新组件内容
  updateComponentData = (payload) => {
    const { dispatch } = this.props
    window.ee.emit('COMPONENT_CONFIG_UPDATE', { type: 'content', ...payload })
    dispatch({
      type: 'design/updateContent',
      payload
    })
  }

  // 更新组件样式
  updateComponentStyle = (payload) => {
    const { dispatch } = this.props
    window.ee.emit('COMPONENT_CONFIG_UPDATE', { type: 'style', ...payload })
    dispatch({
      type: 'design/updateStyle',
      payload
    })
  }

  // 更新组件权限
  onAuthChange = (checked) => {
    const { id } = this.state
    this.setState({
      auth: checked
    }, () => {
      const { dispatch } = this.props
      dispatch({
        type: 'design/updateAuth',
        payload: { id, checked },
      })
    })
  }

  // 平台列表改变
  onChannelChange = (channel) => {
    const { id } = this.state
    const { dispatch } = this.props
    this.setState({ channel }, () => {
      dispatch({
        type: 'design/updateChannel',
        payload: { id, channel },
      })
    })
  }


  render() {
    const { id, name, data, o2o, auth, componentStyle, channel } = this.state
    const settingStyle = classnames('x-design-setting', { active: !!id })
    return (
      <Sider width="300" className={settingStyle}>
        <div className="x-design-setting-scroll">
          <Collapse className="x-design-setting-scroll-collapse" bordered={false} defaultActiveKey={['content']}>
            <Panel header="平台列表" key="channels">
              <div className="module-content">
                <div className="content-data">
                  <Group options={channelOptions} value={channel} onChange={this.onChannelChange} />
                </div>
              </div>
            </Panel>
            <Panel header="内容" key="content">
              <div className="module-content">
                { o2o ? (
                  <div className="content-data">
                    <div className="content-data-title">
                      <span className="auth-text">内容操作是否权限下放</span>
                      <Switch checked={auth} checkedChildren="是" unCheckedChildren="否" onChange={this.onAuthChange} />
                    </div>
                  </div>
                ) : null }

                <Suspense fallback={<div>Loading...</div>}>
                  {
                    name && <DynamicComponent
                      maps={ContentMaps}
                      onChange={this.updateComponentData}
                      config={{
                        id,
                        data,
                        component: name
                      }}
                    />
                  }
                </Suspense>
              </div>
            </Panel>
            {
              componentStyle.length && componentStyle.map((styleConfig) => (
                <Panel header={styleConfig.name} key={styleConfig.key}>
                  <div className="module-content">
                    <Suspense fallback={<div>Loading...</div>}>
                      {
                        styleConfig.items.length && styleConfig.items.map((item) => (
                          <DynamicComponent
                            key={`${id}_${item.key}`}
                            maps={EditorMaps}
                            config={{ id, styleId: styleConfig.key, ...item }}
                            onChange={this.updateComponentStyle}
                          />
                        ))
                      }
                    </Suspense>
                  </div>
                </Panel>
              ))
            }
          </Collapse>
        </div>
      </Sider>
    )
  }
}

export default Setting
