import React, { PureComponent } from 'react';
import { Form, Modal, DatePicker, Radio } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

import '../index.less'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

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
        const { publishType, timer } = fieldsValue
        const params = {
          publishType,
          timer: publishType === 'timing' && timer.format(FORMAT_DATE)
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
    const { form: { getFieldDecorator, getFieldValue } } = this.props
    const publishType = getFieldValue('publishType')
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
            {getFieldDecorator('publishType', {
              initialValue: 'immediately'
            })(
              <Radio.Group>
                <Radio value="immediately">立即发布</Radio>
                <Radio value="timing">定时发布</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item style={{ display: publishType === 'timing' ? 'block':'none' }} hasFeedback {...formItemLayout} label="发布时间">
            {getFieldDecorator('timer', {
              rules: [
                {
                  required: publishType === 'timing',
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
        </Form>
      </Modal>
    );
  }
}

export default PageForm
