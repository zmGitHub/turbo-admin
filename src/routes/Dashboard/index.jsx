import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Button } from 'antd'

export default class Dashboard extends Component {
  state = {
    a: 123
  }

  render() {
    const { a } = this.state
    return (
      <div>
        {a}
        <Button type="primary">test</Button>
        <Link to="/design">444</Link>
      </div>
    )
  }
}
