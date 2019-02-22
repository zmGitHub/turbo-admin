import React, { PureComponent } from 'react';
import { Form, Select, Input, Modal, message } from 'antd'
import { is } from 'ramda'

import './index.less'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

@Form.create()
class  PageForm extends PureComponent {

  static defaultProps = {
    data: {}
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
    const { form, onChange, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'design/create',
          payload: { ...values, data: '[]' },
          callback: (res) => {
            if (is(Boolean, res)) {
              onChange('reload')
            } else {
              message.warn(res.message || '模板创建失败, 请重试!')
            }
          }
        })
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
    const { form: { getFieldDecorator }, data } = this.props
    return (
      <Modal
        destroyOnClose
        width="520px"
        title="创建新模板"
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
              initialValue: data.query,
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
              initialValue: data.type,
              rules: [
                {
                  required: true,
                  message: '请选择模板类型'
                }
              ]
            })(
              <Select
                style={{ width: '100%' }}
                placeholder="请选择模板类型"
              >
                <Option value="1">首页模板</Option>
                <Option value="2">活动模板</Option>
                <Option value="3">专区模板</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item hasFeedback {...formItemLayout} label="缩略图">
            {getFieldDecorator('url', {
              rules: [
                {
                  type: 'url',
                  message: '请输入有效地址'
                }
              ],
              initialValue: data.url
            })(
              <Input type="url" placeholder="缩略图(500*890)" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default PageForm
