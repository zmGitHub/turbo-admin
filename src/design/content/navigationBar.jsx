import React, { PureComponent, Fragment } from 'react'
import { Input,  message, Spin, Icon } from 'antd'
import { is, append, remove, prop } from 'ramda'

const { Search } = Input

class NavigationBarDesign extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    config: {
      items: []
    }
  }

  constructor(props) {
    super(props)
    const { config: { data } } = props
    this.state = {
      list:data.items
    }
  }

  // 删除官方资讯
  deleteOfficialItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { list } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, list)
    this.setState({ list: newItems }, () => {
      onChange({ id, key: 'items', value: newItems })
    })
  }


  render() {
    return (
      <Fragment>
        <div>
          11111
        </div>
      </Fragment>
    );
  }
}

export default NavigationBarDesign
