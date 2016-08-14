import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';

import ReportPrimaryForm from './ReportPrimaryForm';

class ReportPrimary extends Component {
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
        <td colSpan="16" className="text-center">
          暂无数据
        </td>
      </tr>);
    }
    return (
      <Portlet title="一级报表管理" subTitle="自定义查询" icon="list" color="font-green-sharp">
        <ReportPrimaryForm onSubmit={this.query} />
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th colSpan="1" rowSpan="7" className="th-middle">
                分拨中心
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
            {
              items.data.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.centerName}</td>
                  <td>{item.month}</td>
                  <td>{item.sum}</td>
                  <td />
                  <td>{item.dispatchSum}</td>
                  <td>{item.inStock}</td>
                  <td>{item.outStock}</td>
                  <td>{item.dispatch}</td>
                  <td>{item.crossing}</td>
                  <td>{item.returnIndustryOperating}</td>
                  <td>{item.returnFactoryOperating}</td>
                  <td>{item.operationSum}</td>
                  <td>{item.factoryPickUp}</td>
                  <td>{item.newSpare}</td>
                  <td>{item.returnIndustry}</td>
                  <td>{item.returnFactory}</td>
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
  return { items: state.basicReducer.balancePrimary };
}

ReportPrimary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(ReportPrimary);

