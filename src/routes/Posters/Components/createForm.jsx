import React, { PureComponent } from 'react';
import { Form, Select, Input, Modal, Icon } from 'antd'
import ImagePicker from '@/components/ImagePicker'
import { is, last, includes } from 'ramda'

import '../index.less'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

const TYPE_MAPS = {
  home: 1,
  activity: 2,
  goods: 3
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
      visible: false,
      showImgPicker: false,
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
          onChange({ id: item.id, name: values.name, cover: values.cover })
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

  onImageChange = (images) => {
    const { form: { setFieldsValue } } = this.props
    if (images && images.length) {
      const imgItem = last(images)
      setFieldsValue({ cover: imgItem.url }, () => {
        this.setState({ showImgPicker: false })
      })
    } else {
      this.setState({ showImgPicker: false })
    }
  }

  showImagePicker = () => {
    this.setState({ showImgPicker: true })
  }

  render() {
    const { visible, showImgPicker } = this.state
    const { form: { getFieldDecorator, getFieldValue }, type, item } = this.props
    return (
      <Modal
        destroyOnClose
        width="520px"
        title={item.id ? '编辑海报' : '创建海报'}
        className="x-customer-modal"
        cancelText="取消"
        okText="确定"
        onCancel={this.handleCancle}
        onOk={this.handleSubmit}
        visible={visible}
      >
        <Form layout="horizontal">
          <Form.Item hasFeedback {...formItemLayout} label="海报名称">
            {getFieldDecorator('name', {
              initialValue: item && item.name,
              rules: [
                {
                  required: true,
                  message: '请输入海报名称'
                }
              ]
            })(
              <Input maxLength={12} placeholder="请输入海报名称" />
            )}
          </Form.Item>
          <Form.Item hasFeedback {...formItemLayout} label="海报类型">
            {getFieldDecorator('type', {
              initialValue: TYPE_MAPS[type],
              rules: [
                {
                  required: true,
                  message: '请选择海报类型'
                }
              ]
            })(
              <Select
                disabled={!!item.id}
                style={{ width: '100%' }}
                placeholder="请选择海报类型"
              >
                <Option value={1}>首页海报</Option>
                <Option value={2}>活动海报</Option>
                <Option value={3}>商品海报</Option>
                <Option value={4}>全景图海报</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item hasFeedback {...formItemLayout} label="海报分享封面" >
            {getFieldDecorator('cover', {
              rules: [
                {
                  required: true,
                  message: '请选择海报分享封面'
                }
              ]
            })(
              <div className='poster-cover-container' onClick={this.showImagePicker}>
                <img alt="" src={getFieldValue('cover') || item.cover} />
                <span>建议宽:长=5:4,尺寸为 600:480</span>
              </div>
            )}
          </Form.Item>
        </Form>
        <ImagePicker visible={showImgPicker} onChange={this.onImageChange} />
      </Modal>
    );
  }
}

export default PageForm
