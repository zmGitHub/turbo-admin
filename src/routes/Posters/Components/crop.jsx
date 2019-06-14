import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { is, find, propEq, concat } from 'ramda'
import interact from 'interactjs'

class Crop extends PureComponent {
  static cropStyle = (coordinate) => {
    const {
      x, y,
    } = coordinate

    return {
      top: y,
      left: x,
    }
  }

  constructor(props) {
    super(props)
    const { data: { key }, componentStyle, content } = this.props
    const { position, ...rest } = content
    this.state = {
      id: key,
      componentStyle,
      content: rest,
      ...position
    }
  }

  componentDidMount() {
    interact(this.crop)
      .draggable({
        // 开启平滑效果
        inertia: true,
        // 保持元素在父容器内部
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
      })
      .on('dragmove', this.handleDragMove)

      window.ee.on('POSTER_CONFIG_UPDATE', this.onConfigChange)
  }

  componentWillUnmount() {
    interact(this.crop).unset()
    window.ee.off('POSTER_CONFIG_UPDATE', () => {
      console.log('删除监听事件')
    })
  }

  onConfigChange = (res) => {
    const { id, componentStyle, content } = this.state
    const { type, data: { key, value } } = res
    if (id === res.data.id) {
      // 改变样式
      if(type === 'style') {
        const style = find(propEq('key', key))(componentStyle)
        if(style && style.key) {
          style.value = value
          // 产生新的数组 触发 render
          this.setState({ componentStyle: concat([], componentStyle) })
        }
      } else {
        // 改变内容
        this.setState({ content: { ...content, [key]: value } })
      }
    }
  }

  handleDragMove = (e) => {
    const { dx, dy } = e
    const { x, y } = this.state
    this.setState({
      x: x + dx,
      y: y + dy
    })
  }

  getElement = () => {
    const { data, onChange } = this.props
    const { id, x, y, componentStyle, content } = this.state
    const component = { ...data }
    component.content.data = { ...content, position: { x, y } }
    component.style = componentStyle
    window.ee.emit('GET_POSTER_DATA', data)
    if (is(Function, onChange)) {
      onChange({ id, x, y })
    }
  }


  render() {
    const { x, y, componentStyle, content } = this.state
    const { children } = this.props
    return (
      <div
        onClick={this.getElement}
        className="x-poster-item"
        style={Crop.cropStyle({ x, y })}
        ref={crop => { this.crop = crop }}
      >
        {children(componentStyle, content)}
      </div>
    )
  }
}


export const coordinateType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

Crop.propTypes = {
  onChange: PropTypes.func, // eslint-disable-line
}

export default Crop
