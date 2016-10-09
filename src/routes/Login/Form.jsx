import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class LoginForm extends Component {
  render() {
    const { fields: { nickname, password }, submitting, handleSubmit } = this.props;
    return (
      <Form className="login-form" onSubmit={handleSubmit}>
        <h3 className="form-title text-center">用户登录</h3>
        <div className="alert alert-danger display-hide">
          <Button className="close" data-close="alert" />
          <span>Enter any nickname and password.</span>
        </div>
        <div className="form-group">
          <Label className="control-label visible-ie8 visible-ie9">用户名</Label>
          <div className="input-icon">
            <Icon type="user" />
            <Input
              className="placeholder-no-fix"
              type="text"
              placeholder="请输入登录名称"
              {...nickname}
            />
          </div>
        </div>
        <div className="form-group">
          <Label className="visible-ie8 visible-ie9">密 码</Label>
          <div className="input-icon">
            <Icon type="lock" />
            <Input
              className="placeholder-no-fix"
              type="password"
              placeholder="请输入用户密码"
              {...password}
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" className="blue btn-block btn-circle" disabled={submitting}>
            登 录
          </Button>
        </div>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

// 将表单字段绑定到 reduxForm
export default reduxForm({
  form: 'login',
  fields: ['nickname', 'password']
})(LoginForm);

