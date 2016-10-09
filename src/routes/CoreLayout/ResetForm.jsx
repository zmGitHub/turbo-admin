import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class ResetForm extends Component {
  render() {
    const {
      fields: { oldPassword, newPassword },
      onCancle,
      handleSubmit
    } = this.props;
    return (
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-group">
            <Label htmlFor="oldPassword" className="col-md-4">原始密码</Label>
            <div className="col-md-8">
              <Input type="text" id="oldPassword" placeholder="请输原始密码" {...oldPassword} />
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="newPassword" className="col-md-4">新密码</Label>
            <div className="col-md-8">
              <Input type="text" id="newPassword" placeholder="请输入新密码" {...newPassword} />
              <small className="help-block">
                账户密码至少8位，需符合大小写字母、数字、特殊字符
              </small>
            </div>
          </div>
        </div>
        <div className="form-actions text-right">
          <Button type="button" className="btn-default" onClick={() => onCancle()}>
            <Icon type="undo" /> 取 消
          </Button>
          <Button type="submit" className="blue">
            <Icon type="check" /> 确 定
          </Button>
        </div>
      </Form>
    );
  }
}

ResetForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired
};

// 将表单字段绑定到 reduxForm
export default reduxForm({
  form: 'ResetForm',
  fields: [
    'oldPassword', 'newPassword'
  ]
})(ResetForm);

