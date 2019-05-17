import React, { PureComponent } from 'react'
import { Transfer, Card, Button , message} from 'antd'
import { connect } from 'dva'
import authKeys from '@/design/templates/keys'
import './index.less'

@connect(({ app, loading }) => ({
  auth: app.componentAuth,
  loading: loading.effects['app/getComponentAuth']
}))
class CMPAuth extends PureComponent {
  state = {
    dataSource: authKeys,
    targetKeys: [],
  }


  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'app/getComponentAuth',
      callback: (list) => {
        if (list && list.length) {
          this.setState({ targetKeys: list })
        }
      }
    })
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  updateAuth = () => {
    const { targetKeys } = this.state
    if (targetKeys.length > 0) {
      const data = targetKeys.join()
      const { dispatch, auth: { id } } = this.props
      const payload = { data }
      if (id) {
        payload.id = id
      }
      dispatch({
        type: 'app/updateComponentAuth',
        payload,
        callback: () => {
          message.success('修改组件权限成功')
        }
      })
    } else {
      message.warning('请至少选择一个数据')
    }
  }

  render() {
    const { loading } = this.props;
    const { dataSource, targetKeys } = this.state
    return (
      <Card loading={loading} className="component-auth" title="权限列表" extra={<Button onClick={this.updateAuth} type="primary">保 存</Button>}>
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
