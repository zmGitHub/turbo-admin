import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGet());
  }
  handleRefreshClick() {
    const { dispatch } = this.props;
    dispatch(fetchGet());
  }

  render() {
    const { items } = this.props;
    let noData = '';
    if (!items.data) {
      items.data = [];
      noData = (<tr>
        <td colSpan="10" className="text-center">
          暂无数据{items.total}
        </td>
      </tr>);
    }
    const checkFeeds = (status) => {
      return status ? '是' : '否';
    };
    return (
      <Portlet title="上下架列表" subTitle="自定义查询" icon="user" color="font-green-sharp">
        <Form className="form-horizontal">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">上下架</Label>
                <div className="col-md-8">
                  <select className="form-control">
                    <option>全 部</option>
                    <option>已上架</option>
                    <option>已下架</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">月 份</Label>
                <div className="col-md-8">
                  <Input type="text" id="month" placeholder="请输入月份" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">部 门</Label>
                <div className="col-md-8">
                  <Input type="text" id="month" placeholder="请输入部门" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">备件描述</Label>
                <div className="col-md-8">
                  <Input type="text" id="month" placeholder="请输入备件描述" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="form-group">
                <Label htmlFor="month" className="col-md-4">计费类型</Label>
                <div className="col-md-8">
                  <select className="form-control">
                    <option>全 部</option>
                    <option>计费</option>
                    <option>不计费</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 text-right">
              <Button type="reset" className="btn-default">
                <Icon type="mail-reply" /> 重 置
              </Button>
              <Button type="button" className="blue" onClick={this.handleRefreshClick}>
                <Icon type="search" /> 查 询
              </Button>
            </div>
          </div>
        </Form>
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th>
                部门类型
              </th>
              <th className="hidden-xs">
                部门名称
              </th>
              <th>
                备件描述
              </th>
              <th>
                备件编码
              </th>
              <th>
                数 量
              </th>
              <th>
                费 用
              </th>
              <th>
                时 间
              </th>
              <th>
                是否计费
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.data.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.branchType}</td>
                  <td>{item.branchName}</td>
                  <td>{item.spareDescribe}</td>
                  <td>{item.spareUniqueKey}</td>
                  <td>{item.amount}</td>
                  <td>{item.cost}</td>
                  <td>{item.tranAt}</td>
                  <td>{checkFeeds(item.fees)}</td>
                </tr>);
              })
            }
            {noData}
          </tbody>
        </Table>
      </Portlet>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { items: state.basicReducer.dispatch };
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(Home);
