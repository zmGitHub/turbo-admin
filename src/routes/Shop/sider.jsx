import React, { PureComponent, Fragment } from 'react';
import { Layout, Collapse, Tooltip } from 'antd'
import classnames from 'classnames'
import _find from 'lodash/find'
import TemplateMaps from '@/design/templates'
import { uniqueId } from '@/utils'

const { Sider } = Layout;
const { Panel } = Collapse


// 左侧折叠面板
const DATA = [

]

class SiderLeft extends PureComponent {
  static defaultProps = {
    active: false
  }

  constructor(props) {
    super(props)
    this.state = {
      components: [],
      current: ''
    }
  }

  componentDidMount() {
    window.ee.on('RESET_LAYOUT_STATUS', this.resetSiderStatus)
    window.ee.on('RESET_SIDER_STATUS', this.resetSiderStatus)
  }

  componentWillUnmount() {
    window.ee.off('RESET_LAYOUT_STATUS')
    window.ee.off('RESET_SIDER_STATUS')
  }

  resetSiderStatus = () => {
    this.setState({ current: '' })
  }

  // 添加组件到主控制区域
  addComponent = (data) => {
    const key = uniqueId(8,8)
    // 添加组件到列表
    const component = { key, ...data }
    window.ee.emit('ADD_COMPONENT_DATA', component)
  }

  toggleTemplate = (event) => {
    const { currentTarget } = event
    const pid = currentTarget.getAttribute('data-pid')
    const id = currentTarget.getAttribute('data-id')
    // TODO:
    // currentTarget为当前元素
    // 此处的pid为DATA一层数据,id为DATA子元素的children的key(即为组件的种类)
    const template = _find(DATA, ({ key }) => key === pid)
    if (template && template.key) {
      const { key, components } = _find(template.children, (item) => id === item.key )
      if (key && components.length) {
        this.setState({ components, current: id })
      } else {
        this.setState({ current: id })
      }
    } else {
      this.setState({ current: id })
    }
    window.ee.emit('OPEN_SIDER_PANEL')
  }


  renderTemplateItem = (template) => {
    const { config, component } = TemplateMaps[template.name]
    // 传入外部参数改变默认 config 比如: 同一个组件但是不同的体现方式
    const data = config(template.options)
    const { name, desc, content, style } = data
    return (
      <div key={template.id} className="item" onClick={() => { this.addComponent(data) }}>
        <div className="item-header">
          <div className="item-header-title">{name}</div>
          <div className="item-header-desc">{desc}</div>
        </div>
        <Tooltip title="点击添加到页面">
          <div className="item-content">
            {
              React.createElement(component, {
                componentStyle: style,
                data: content.data,
              })
            }
          </div>
        </Tooltip>
      </div>
    )
  }

  render() {
    const { current, components } = this.state
    const designStyle = classnames('x-shop-sider-templates', { active: !!current })
    return (
      <Fragment>
        <Sider className="x-shop-sider">
          <div className="x-shop-sider-scroll">
            <div className="x-shop-sider-scroll-header">历史模板</div>
            <div className="x-shop-sider-scroll-content">
            123123
            </div>
          </div>
          <Sider width="375" className={designStyle}>
            <div className="x-shop-sider-templates-content">
              {
                components.map(component => this.renderTemplateItem(component))
              }
            </div>
          </Sider>
        </Sider>
      </Fragment>
    )
  }
}


export default SiderLeft
