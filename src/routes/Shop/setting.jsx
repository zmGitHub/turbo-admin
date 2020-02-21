// 右侧设置
import React, { Suspense, lazy, PureComponent } from 'react'
import { Layout, Collapse } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import ContentMaps from '@/design/content'

const { Sider } = Layout
const { Panel } = Collapse

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
    this.state = {
      id: '',
      name: '',
      data: null,
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
    })
  }

  setComponentData = (data) => {
    this.setState({ ...data })
  }

  // 更新组件内容
  updateComponentData = (payload) => {
    const { dispatch } = this.props
    window.ee.emit('COMPONENT_CONFIG_UPDATE', { type: 'content', ...payload })
    dispatch({
      type: 'o2o/updateContent',
      payload
    })
  }


  render() {
    const { id, name, data } = this.state
    const settingStyle = classnames('x-shop-setting', { active: !!id })
    return (
      <Sider width="300" className={settingStyle}>
        <div className="x-shop-setting-scroll">
          <Collapse className="x-shop-setting-scroll-collapse" bordered={false} defaultActiveKey={['content']}>
            <Panel header="内容" key="content">
              <div className="module-content">
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
          </Collapse>
        </div>
      </Sider>
    )
  }
}

export default Setting