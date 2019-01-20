import React, { Suspense, lazy, PureComponent } from 'react'
import { Collapse } from 'antd'
import EditorMaps from '@/editor'

const { Panel } = Collapse

/**
 * TODO: 应该抽象到公共的模块去统一调用
 * @param {id} 父组件的唯一标志
 * @param {onChange} 内部参数变动函数
 * @param {config} 子编辑器的配置
 */
const EditorItem = ({ onChange, config }) => {
  const { component } = config
  // TODO: 组件不存在需要处理
  // eslint-disable-next-line dot-notation
  const LoadComponent = EditorMaps[component] || EditorMaps["error"]
  const Lazycomponent = lazy(() => LoadComponent)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lazycomponent config={config} onChange={onChange} />
    </Suspense>
  )
}


class Setting extends PureComponent {

  static defaultProps = {
    data: {
      style: []
    }
  }

  render() {
    const { data, onChange } = this.props
    const { key, style } = data
    const onPropsChange = (editorStyle) => {
      if (onChange && typeof onChange === 'function') {
        onChange(editorStyle)
      }
    }
    console.log('setting---render')
    return (
      <div className="x-design-setting-scroll">
        <Collapse className="x-design-setting-scroll-collapse" bordered={false} defaultActiveKey={['content']}>
          <Panel header="内容" key="content">
            <div className="module-content">asdf</div>
          </Panel>
          {
            style.length && style.map((styleConfig) => (
              <Panel header={styleConfig.name} key={styleConfig.key}>
                <div className="module-content">
                  {
                    styleConfig.items.length && styleConfig.items.map((item) => (
                      <EditorItem key={item.key} config={{ id: key, styleId: styleConfig.key, ...item }} onChange={onPropsChange} />
                    ))
                  }
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
