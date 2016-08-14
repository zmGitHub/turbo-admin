import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import IndustryForm from './IndustryForm';

class Industry extends Component {
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
        <td colSpan="10" className="text-center">
          暂无数据
        </td>
      </tr>);
    }
    return (
      <Portlet title="旧件返工贸管理" subTitle="自定义查询" icon="list" color="font-green-sharp">
        <IndustryForm onSubmit={this.query} />
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th>
                网点名称
              </th>
              <th className="hidden-xs">
                返回编码
              </th>
              <th>
                备件代码
              </th>
              <th>
                备件描述
              </th>
              <th>
                返回数量
              </th>
              <th>
                仓库结算金额
              </th>
              <th>
                运费结算
              </th>
              <th>
                成本单位
              </th>
              <th>
                返回时间
              </th>
              <th>
                备件重量
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.data.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.networkName}</td>
                  <td>{item.backCode}</td>
                  <td>{item.spareCode}</td>
                  <td>{item.spareDescribe}</td>
                  <td>{item.returnNumber}</td>
                  <td>{item.operatingCost}</td>
                  <td>{item.expressCost}</td>
                  <td>{item.remark}</td>
                  <td>{item.returnTime}</td>
                  <td>{item.spareWeight}</td>
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
  return { items: state.basicReducer.dispatchIndustry };
}

Industry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(Industry);
