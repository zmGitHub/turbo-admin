import React, { PureComponent } from 'react'
import { Transfer, Card } from 'antd'
import authKeys from '@/design/templates/keys'
import './index.less'

class CMPAuth extends PureComponent {
  state = {
    dataSource: authKeys,
    targetKeys: [],
  }


  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }


  render() {
    const { dataSource, targetKeys } = this.state
    return (
      <Card className="component-auth" title="权限列表">
        <Transfer
          lazy={false}
          dataSource={dataSource}
          showSearch
          listStyle={{
            width: 250,
            height: 300,
          }}
          titles={['装修组件', '商家组件']}
          operations={['授权', '撤销']}
          targetKeys={targetKeys}
          onChange={this.handleChange}
          render={item => item.title}
        />
      </Card>
    )
  }
}

export default CMPAuth
