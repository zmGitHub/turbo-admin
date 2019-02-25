import React, { PureComponent } from 'react'
import { Icon } from 'antd'

class Error extends PureComponent {
  render() {
    const { component } = this.props
    return (
      <div className="editor-error">
        <Icon type="warning" />
        <div className="editor-error-desc">{component}-导入失败</div>
      </div>
    );
  }
}

export default Error
