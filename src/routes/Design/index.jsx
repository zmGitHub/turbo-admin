import React, { Component } from 'react'

export default class Dashboard extends Component {
  state = {
    a: 123
  }

  render() {
    const { a } = this.state
    return (
      <div>
        {a}
        装修
      </div>
    )
  }
}
