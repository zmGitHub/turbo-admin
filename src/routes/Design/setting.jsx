import React, { Suspense, lazy } from 'react'
import { Collapse, Layout } from 'antd'
import _find from 'lodash/find'
import classnames from 'classnames'
import EditorMaps from '@/editor'


const { Panel } = Collapse
const { Sider } = Layout

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
/**
 *
 * @param {active} 是否显示样式编辑面板
 * @param {config} 当前组件的编辑配置
 * @param {onChange} 当内容模块和样式模块变动时触发外部的dispatch
 */
const Setting = ({ active, items = [], id, onChange }) => {
  let config = {
    style: []
  }
  if (items && items.length) {
    const component = _find(items, (item) => {
      if (item && item.key) {
        return item.key === id
      }
      return false
    })
    if (component && component.key) {
      config = component
    }
  }

  const { key, style } = config
  const settingStyle = classnames('x-design-setting', { active })
  const onPropsChange = (editorStyle) => {
    if (onChange && typeof onChange === 'function') {
      onChange(editorStyle)
    }
  }
  console.log('触发变动...')
  console.log(style)
  console.log('触发变动...')
  return (
    <Sider width="300" className={settingStyle}>
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

    </Sider>
  )
}

export default Setting
