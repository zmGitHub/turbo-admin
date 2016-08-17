import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import CrossingForm from './CrossingForm';

class Crossing extends Component {
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
    let noData = '';
    if (!items.total) {
      items.data = [];
      noData = (<tr>
        <td colSpan="14" className="text-center">
          暂无数据
        </td>
      </tr>);
    }
    return (
      <Portlet title="过站作费管理" subTitle="自定义查询" icon="list" color="font-green-sharp">
        <CrossingForm onSubmit={this.query} />
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th>
                结算单位
              </th>
              <th className="hidden-xs">
                发货部门
              </th>
              <th>
                收货部门
              </th>
              <th>
                网点代码
              </th>
              <th>
                订单编码
              </th>
              <th>
                备件代码
              </th>
              <th>
                备件描述
              </th>
              <th>
                箱 码
              </th>
              <th>
                结算金额
              </th>
              <th>
                发运时间
              </th>
              <th>
                接收时间
              </th>
              <th>
                成本单位
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.data.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.costBranchName}</td>
                  <td>{item.sendBranchName}</td>
                  <td>{item.receiveBranchName}</td>
                  <td>{item.networkCode}</td>
                  <td>{item.orderCode}</td>
                  <td>{item.spareUniqueKey}</td>
                  <td>{item.spareDescribe}</td>
                  <td>{item.cartonCode}</td>
                  <td>{item.cost}</td>
                  <td>{item.sendTime}</td>
                  <td>{item.receiveTime}</td>
                  <td>{item.costBranchName}</td>
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
  return { items: state.basicReducer.storage };
}

Crossing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(Crossing);
