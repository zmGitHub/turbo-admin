import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Portlet from 'components/Portlet';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class Cliam extends Component {

  render() {
    return (
      <Portlet title="索赔录入" subTitle="数据添加" icon="add" color="font-green-sharp">
        <Form className="form-horizontal">
          <div className="form-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">部门名</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入部门名" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">上架索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入上架索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">下架索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入下架索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">发运索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入发运索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">部门名</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入部门名" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">过站索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入过站索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">旧件返工贸索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入旧件返工贸索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">旧件返工厂索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入旧件返工厂索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">部门名</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入部门名" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">工厂提货索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入工厂提货索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">新件配送索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入新件配送索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">旧件返工贸运费索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入旧件返工贸运费索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">旧件返工厂索赔金额</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请输入旧件返工厂索赔金额" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">索赔月份</Label>
                  <div className="col-md-8">
                    <Input type="text" placeholder="请选择日期" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <Label htmlFor="month" className="col-md-4">见证性文件</Label>
                  <div className="col-md-8">
                    <Button type="button" className="blue" onClick={this.handleRefreshClick}>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <div className="row">
              <div className="col-md-12 text-center">
                <Button type="button" className="blue" onClick={this.handleRefreshClick}>
                  <Icon type="check" /> 确 定
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Portlet>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.dispatch };
}

Cliam.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Cliam);
