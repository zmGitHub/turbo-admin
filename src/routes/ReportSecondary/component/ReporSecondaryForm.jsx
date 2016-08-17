import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class ReporSecondaryForm extends Component {
  render() {
    const {
      fields: { time, branchName, status },
      resetForm,
      handleSubmit
    } = this.props;
    return (
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">月 份</Label>
              <div className="col-md-8">
                <Input type="month" placeholder="请输入月份" {...time} />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">分拨中心</Label>
              <div className="col-md-8">
                <Input type="text" placeholder="请输入分拨中心" {...branchName} />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <Label htmlFor="month" className="col-md-4">计费类型</Label>
              <div className="col-md-8">
                <select className="form-control" {...status}>
                  <option value="">全 部</option>
                  <option value="1">计 费</option>
                  <option value="0">不计费</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-12 text-right">
            <Button type="button" className="btn-default" onClick={resetForm}>
              <Icon type="mail-reply" /> 重 置
            </Button>
            <Button type="submit" className="blue pull-right" onClick={this.handleRefreshClick}>
              <Icon type="search" /> 查 询
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

ReporSecondaryForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.resetForm
};

// 将表单字段绑定到 reduxForm
export default reduxForm({
  form: 'ReporSecondaryForm',
  fields: ['time', 'branchName', status]
})(ReporSecondaryForm);
