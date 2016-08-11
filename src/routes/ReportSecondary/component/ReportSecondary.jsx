import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class ReportSecondary extends Component {
  render() {
    return (
      <Portlet title="二级报表管理" subTitle="自定义查询" icon="list" color="font-green-sharp">
        <Form className="form-horizontal">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">月 份</Label>
                <div className="col-md-8">
                  <Input type="text" placeholder="请输入月份" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">分拨中心</Label>
                <div className="col-md-8">
                  <Input type="text" placeholder="请输入分拨中心" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Button type="button" className="blue" onClick={this.handleRefreshClick}>
                <Icon type="search" /> 查 询
              </Button>
              <Button type="reset" className="btn-default pull-right">
                <Icon type="download" /> 下载报表
              </Button>
            </div>
          </div>
        </Form>
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th colSpan="1" rowSpan="7" className="th-middle">
                分拨中心
              </th>
              <th className="hidden-xs th-middle" colSpan="1" rowSpan="7">
                类 别
              </th>
              <th className="th-middle" colSpan="1" rowSpan="7">
                部 门
              </th>
              <th className="th-middle" colSpan="1" rowSpan="7">
                结算状态
              </th>
              <th className="th-middle" colSpan="1" rowSpan="7">
                月 份
              </th>
              <th className="th-middle" colSpan="1" rowSpan="7">
                合 计
              </th>
              <th className="text-center" rowSpan="1" colSpan="7">
                仓储操作费
              </th>
              <th className="text-center" rowSpan="1" colSpan="7">
                运 费
              </th>
            </tr>
            <tr>
              <th />
              <th rowSpan="7">小 计</th>
              <th rowSpan="7">上 架</th>
              <th rowSpan="7">下 架</th>
              <th rowSpan="7">发 运</th>
              <th rowSpan="7">过 站</th>
              <th rowSpan="7">旧件返工贸</th>
              <th rowSpan="7">旧件返工厂</th>
              <th rowSpan="7">小 计</th>
              <th rowSpan="7">工厂提货</th>
              <th rowSpan="7">新件运费</th>
              <th rowSpan="7">旧件返工贸</th>
              <th rowSpan="7">旧件返工厂</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="19" className="text-center">
                暂无数据
              </td>
            </tr>
          </tbody>
        </Table>
      </Portlet>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.dispatch };
}

ReportSecondary.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ReportSecondary);
