import React, { PureComponent } from 'react';
import { Form, Modal, DatePicker, Radio, Switch } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

import './index.less'


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

@Form.create()
class PageForm extends PureComponent {
  static defaultProps = {
    data: {
      isTiming: '0',
      isPublish: '0',
      timingTime: null
    }
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
    const { form, onChange } = this.props;
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { isPublish, isTiming, timingTime } = fieldsValue

        const params = {
          isPublish: isPublish ? '1' : '0',
          isTiming,
          timingTime: isTiming === '1' && timingTime.format('YYYY-MM-DD HH:mm:ss')
        }
        onChange(params)
      }
    });
  }

  handleCancle = () => {
    const { onChange } = this.props;
    onChange()
  }

  render() {
    const { visible } = this.state
    const { form: { getFieldDecorator, getFieldValue }, data } = this.props
    const isTimer = getFieldValue('isTiming') === '1'
    return (
      <Modal
        destroyOnClose
        width="520px"
        title="发布模板"
        className="x-customer-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleCancle}
        onOk={this.handleSubmit}
        visible={visible}
      >
        <Form layout="horizontal">
          <Form.Item {...formItemLayout} label="发布类型">
            {getFieldDecorator('isTiming', {
              initialValue: data.isTiming
            })(
              <Radio.Group>
                <Radio value="0">立即发布</Radio>
                <Radio value="1">定时发布</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item style={{ display: isTimer ? 'block':'none' }} hasFeedback {...formItemLayout} label="发布时间">
            {getFieldDecorator('timingTime', {
              initialValue: data.timingTime,
              rules: [
                {
                  required: isTimer,
                  message: '请选择发布时间'
                }
              ]
            })(
              <DatePicker
                locale={locale}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                getCalendarContainer={trigger => trigger.parentNode}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否默认">
            {getFieldDecorator('isPublish', {
              initialValue: data.isPublish === '1'
            })(
              <Switch checkedChildren="是" unCheckedChildren="否" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default PageForm
