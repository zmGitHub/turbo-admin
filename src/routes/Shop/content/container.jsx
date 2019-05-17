import React, { PureComponent } from 'react';
import { find, propEq, concat } from 'ramda'

class Container extends PureComponent {
  constructor(props) {
    super(props)
    const { componentStyle, content } = this.props
    this.state = {
      componentStyle,
      data: content.data,
    }
  }

  componentDidMount() {
    // 监听数据变化
    window.ee.on('COMPONENT_CONFIG_UPDATE', this.onConfigChange)
  }

  componentWillUnmount() {
    window.ee.off('COMPONENT_CONFIG_UPDATE', (res) => {
      console.log('删除监听事件')
      console.log(res)
    })
  }

  handleClick = (event) => {
    const { id, content, onClick, auth } = this.props
    const component = {
      id,
      auth,
      name: content.component,
      ...this.state
    }
    onClick(event, component)
  }

  onConfigChange = (res) => {
    const { componentStyle, data } = this.state
    const { id } = this.props
    const { type, styleId, key, value } = res
    if (id === res.id) {
      // 改变样式
      if(type === 'style') {
        const styleItem = find(propEq('key', styleId))(componentStyle)
        if (styleItem && styleItem.items) {
          const style = find(propEq('key', key))(styleItem.items)
          if(style && style.key) {
            style.value = value
            // 产生新的数组 触发 render
            this.setState({ componentStyle: concat([], componentStyle) })
          }
        }
      } else {
        // 改变内容
        this.setState({ data: { ...data, [key]: value } })
      }

    }
  }

  render() {
    const { componentStyle, data } = this.state
    const { id, children } = this.props
    return (
      <div id={`component_${id}`} className="drag-component" onClick={this.handleClick}>
        {children(componentStyle, data)}
      </div>
    );
  }
}

export default Container
