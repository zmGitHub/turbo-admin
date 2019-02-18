import React, { Suspense, lazy, PureComponent } from 'react'
import { Collapse } from 'antd'
import { connect } from 'dva'
import ContentMaps from '@/design/content'
import EditorMaps from '@/design/editor'

const { Panel } = Collapse

const DynamicComponent = ({ onChange, config, maps }) => {
  const { component } = config
  const LoadComponent = maps[component] || maps.error
  const Lazycomponent = lazy(() => LoadComponent)
  return (
    <Lazycomponent config={config} onChange={onChange} />
  )
}

@connect()
class Setting extends PureComponent {

  static defaultProps = {
    data: {
      style: [],
      content: {}
    }
  }

  // 更新组件内容
  updateComponentData = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'design/updateContent',
      payload
    })
  }

  // 更新组件样式
  updateComponentStyle = (payload) => {
    const { dispatch } = this.props
    console.log(payload)
    window.ee.emit('COMPONENT_CONFIG_UPDATE', payload)
    // dispatch({
    //   type: 'design/updateStyle',
    //   payload
    // })
  }

  render() {
    const { component } = this.props
    const { key, style, content } = component
    const { data } = content
    return (
      <div className="x-design-setting-scroll">
        <Collapse className="x-design-setting-scroll-collapse" bordered={false} defaultActiveKey={['content']}>
          <Panel header="内容" key="content">
            <div className="module-content">
              <Suspense fallback={<div>Loading...</div>}>
                {
                  content.component && <DynamicComponent
                    maps={ContentMaps}
                    onChange={this.updateComponentData}
                    config={{
                      id: key,
                      ...data,
                      component: content.component
                    }}
                  />
                }
              </Suspense>
            </div>
          </Panel>
          {
            style.length && style.map((styleConfig) => (
              <Panel header={styleConfig.name} key={styleConfig.key}>
                <div className="module-content">
                  <Suspense fallback={<div>Loading...</div>}>
                    {
                      styleConfig.items.length && styleConfig.items.map((item) => (
                        <DynamicComponent
                          key={item.key}
                          maps={EditorMaps}
                          config={{ id: key, styleId: styleConfig.key, ...item }}
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
    )
  }
}

export default Setting
