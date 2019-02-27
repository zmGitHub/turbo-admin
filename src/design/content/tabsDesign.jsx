
import React, { PureComponent, Fragment } from 'react'
import { Form, Input, Button, Switch, Col, Row, Icon } from 'antd'
import { connect } from 'dva'
import { remove, append } from 'ramda'

const { Group } = Input


const AddForm = ({ form, onSubmit }) => {
  const { getFieldDecorator, validateFields } = form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    });
  }
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Group>
        <Row gutter={4}>
          <Col span={9}>
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '名称不能为空'
              }]
            })(<Input placeholder="请输入名称" />)}
          </Col>
          <Col span={9}>
            {getFieldDecorator('id', {
              rules: [{
                required: true,
                message: '页面id不能为空'
              }]
            })(<Input placeholder="请输入页面id" />)}
          </Col>
          <Col span={6}><Button type="primary" htmlType="submit">添加</Button></Col>
        </Row>
      </Group>
    </Form>
  )
}

const WrappedAddForm = Form.create()(AddForm)

@connect()
class TabsDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    this.state = {
      ...data,
    }
  }

  onBorderChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'border', value })
  }

  // 删除
  deletelItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { items } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, items)
    this.setState({ items: newItems }, () => {
      onChange({ id, key: 'items', value: newItems })
    })
  }

  // 添加标签
  addItem = (values) => {
    this.setState(({ items }) => ({
      searchingItem: false,
      items: append(values, items)
    }), () => {
      const { items } = this.state
      const { onChange, config: { id } } = this.props
      onChange({
        id,
        key: 'items',
        value: items
      })
    })
  }

  render() {
    const {  border, items } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">标签页列表</h4>
          <div className="content-data-tabs">
            <div className="list-conent">
              {
                items.map((item, index) => (
                  <div key={`item_${item.id}_${index}`} className="list-conent-item">
                    <div className="name">{item.name}-{item.id}</div>
                    <div className="actions" data-index={index} onClick={this.deletelItem}>
                      <Icon type="delete" />
                    </div>
                  </div>
                ))
              }
            </div>
            <WrappedAddForm onSubmit={this.addItem} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">下划线设置</h4>
          <div className="content-data-tabs inline">
            <div className="label">是否显示下划线</div>
            <Switch defaultChecked={border} onChange={this.onBorderChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TabsDesign
