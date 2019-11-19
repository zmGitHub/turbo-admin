import React, { PureComponent } from 'react';
import { Form, Select, Input, Modal } from 'antd'

import './index.less'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

const TYPE_MAPS = {
  home: 1,
  activity: 2,
  personal: 3,
  category: 4,
}

@Form.create()
class PageForm extends PureComponent {

  static defaultProps = {
    item: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = prevState
    if (nextProps.visible !== visible) {
      return { visible: nextProps.visible }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleSubmit = e => {
    const { form, onChange, item } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (!item.id) {
          onChange({ ...values })
        } else {
          onChange({ id: item.id, ...values })
        }
      }
    });
  }

  handleCancle = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange()
    }
  }

  render() {
    const { visible } = this.state
    const { form: { getFieldDecorator }, type, item } = this.props
    return (
      <Modal
        destroyOnClose
        width="520px"
        title={item.id ? '编辑模板' : '创建新模板'}
        className="x-customer-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleCancle}
        onOk={this.handleSubmit}
        visible={visible}
      >
        <Form layout="horizontal">
          <Form.Item hasFeedback {...formItemLayout} label="模板名称">
            {getFieldDecorator('name', {
              initialValue: item && item.name,
              rules: [
                {
                  required: true,
                  message: '请输入模板名称'
                }
              ]
            })(
              <Input maxLength={12} placeholder="请输入模板名称" />
            )}
          </Form.Item>
          <Form.Item hasFeedback {...formItemLayout} label="模板类型">
            {getFieldDecorator('type', {
              initialValue: +item.type || TYPE_MAPS[type],
              rules: [
                {
                  required: true,
                  message: '请选择模板类型'
                }
              ]
            })(
              <Select
                disabled
                style={{ width: '100%' }}
                placeholder="请选择模板类型"
              >
                <Option value={1}>首页模板</Option>
                <Option value={2}>活动模板</Option>
                <Option value={3}>专区模板</Option>
                <Option value={4}>分类模板</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default PageForm
