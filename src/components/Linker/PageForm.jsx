import React, { PureComponent } from 'react';
import { Form, Select, Input, Button } from 'antd'

import './index.less'

const { Option } = Select

@Form.create()
class PageForm extends PureComponent {

  static defaultProps = {
    data: {
      page: '/pages/index',
      type: 'navigateTo',
      query: ''
    }
  }

  handleSubmit = e => {
    const { form, onChange } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onChange(values)
      }
    });
  };

  render() {
    const { form: { getFieldDecorator, getFieldValue }, data } = this.props
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="页面路径">
          {getFieldDecorator('page', {
            initialValue: data.page,
          })(
            <Select
              style={{ width: 150 }}
              placeholder="请选择页面"
            >
              <Option value="/pages/index">首页</Option>
              <Option value="/pages/design">装修页</Option>
              <Option value="/pages/filter">商品列表</Option>
              <Option value="/pages/article">文章详情</Option>
              <Option value="/pages/my/point-mall">积分商城</Option>
              <Option value="/pages/my/coupon/my-coupon">优惠券中心</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="跳转方式">
          {getFieldDecorator('type', {
            initialValue: data.type,
          })(
            <Select
              style={{ width: 150 }}
              placeholder="请选择跳转方式"
            >
              <Option value="navigateTo">跳转</Option>
              <Option value="switchTab">切换Tab</Option>
              <Option value="redirectTo">重定向</Option>
              <Option value="navigateBack">返回</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="跳转参数">
          {getFieldDecorator('query', {
            initialValue: data.query,
            rules: [
              {
                required: getFieldValue('page') === '/pages/design',
                message: '请输入参数'
              }
            ]
          })(
            <Input placeholder="比如: id=xx&fcid=xx" />
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" size="small">确定</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default PageForm
