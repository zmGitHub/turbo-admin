import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class IndustryForm extends Component {
  render() {
    const {
      fields: { time, spareDescribe, networkName },
      resetForm,
      handleSubmit
    } = this.props;
    return (
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">月 份</Label>
              <div className="col-md-8">
                <Input type="month" placeholder="请输入月份" {...time} />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">备件描述</Label>
              <div className="col-md-8">
                <Input type="text" placeholder="请输入备件描述" {...spareDescribe} />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">网点名称</Label>
              <div className="col-md-8">
                <Input type="text" placeholder="请输入网点名称" {...networkName} />
              </div>
            </div>
          </div>
          <div className="col-md-3 text-right">
            <Button type="button" className="btn-default" onClick={resetForm}>
              <Icon type="mail-reply" /> 重 置
            </Button>
            <Button type="submit" className="blue">
              <Icon type="search" /> 查 询
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

IndustryForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.resetForm
};

// 将表单字段绑定到 reduxForm
export default reduxForm({
  form: 'IndustryForm',
  fields: ['time', 'spareDescribe', 'networkName']
})(IndustryForm);
