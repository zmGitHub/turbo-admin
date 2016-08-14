import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import DispatchSecondaryForm from './DispatchSecondaryForm';

class DispatchSecondary extends Component {
  constructor(props) {
    super(props);
    this.query = this.query.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGet());
  }
  query(params) {
    const { dispatch } = this.props;
    dispatch(fetchGet(params));
  }
  render() {
    const { items } = this.props;
    console.log(items);
    let noData = '';
    if (!items.total) {
      items.data = [];
      noData = (<tr>
        <td colSpan="14" className="text-center">
          暂无数据
        </td>
      </tr>);
    }
    const isReceive = (status) => {
      return status ? '已接收' : '未接收 ';
    };
    return (
      <Portlet title="二次发运费管理" subTitle="自定义查询" icon="list" color="font-green-sharp">
        <DispatchSecondaryForm onSubmit={this.query} />
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th>
                发货部门
              </th>
              <th className="hidden-xs">
                收货部门
              </th>
              <th>
                网点名称
              </th>
              <th>
                备件代码
              </th>
              <th>
                发货状态
              </th>
              <th>
                箱 重
              </th>
              <th>
                箱 码
              </th>
              <th>
                装箱数量
              </th>
              <th>
                结算金额
              </th>
              <th>
                保底金额
              </th>
              <th>
                发运时间
              </th>
              <th>
                过站时间
              </th>
              <th>
                货差数量
              </th>
              <th>
                货差描述
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.data.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.sendBranchName}</td>
                  <td>{item.receiveBranchName}</td>
                  <td>{item.networkName}</td>
                  <td>{item.spareCode}</td>
                  <td>{isReceive(item.isReceive) }</td>
                  <td>{item.spareWeight}</td>
                  <td>{item.spareUniqueKey}</td>
                  <td>{item.sendNumber}</td>
                  <td>{item.express}</td>
                  <td>{item.them || '暂无'}</td>
                  <td>{item.sendTime}</td>
                  <td>{item.receiveTime}</td>
                  <td>{item.receiveNumber}</td>
                  <td>{item.spareDescribe}</td>
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
  return { items: state.basicReducer.dispatchSecondary };
}

DispatchSecondary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(DispatchSecondary);
