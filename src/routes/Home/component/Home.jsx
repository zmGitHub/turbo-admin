import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGet } from './Actions';
import Portlet from 'components/Portlet';
import Table from 'components/Table';
import Form from './Form';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGet());
  }
  handleRefreshClick(values) {
    const { dispatch } = this.props;
    console.log(values);
    dispatch(fetchGet(values));
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
    const checkFeeds = (status) => {
      return status ? '是' : '否';
    };
    return (
      <Portlet title="上下架列表" subTitle="自定义查询" icon="user" color="font-green-sharp">
        <Form onSubmit={this.handleRefreshClick} />
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
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
  return { items: state.basicReducer.dispatch };
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object
};

export default connect(mapStateToProps)(Home);
