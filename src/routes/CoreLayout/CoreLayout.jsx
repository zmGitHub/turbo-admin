import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { get } from 'containers/auth'; // 用户接口

import { logoutUser, resetAction } from './Action';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Notification from 'components/Notification';
import Dialog from 'rc-dialog';
import ResetForm from './ResetForm';

import '../../styles/app.scss';
import './CoreLayout.scss';
import 'rc-dialog/assets/index.css';

const MENUS = [
  {
    id: 1,
    name: '总体分析',
    icon: 'pie-chart',
    url: '/',
    childMenus: []
  },
  {
    id: 2,
    name: '组件',
    icon: 'cogs',
    url: '/',
    childMenus: [
      {
        id: 3,
        name: '表单',
        icon: 'wpforms',
        url: '/component',
        childMenus: []
      }
    ]
  }
];

class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      visible: false
    };
    // 用户退出
    this.logout = this.logout.bind(this);
    // 打开模态框
    this.onModalOpen = this.onModalOpen.bind(this);
    // 关闭模态框
    this.onModalClose = this.onModalClose.bind(this);
    // 提交修改信息
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // 关闭模态框
  onModalOpen() {
    this.setState({
      visible: true
    });
  }
  // 关闭模态框
  onModalClose() {
    this.setState({
      visible: false
    });
  }
  // 提交修改
  handleSubmit(params) {
    const { dispatch } = this.props;
    dispatch(resetAction(params)).then((res) => {
      if (res) {
        Notification.open({
          type: 'success',
          title: '操作成功',
          content: '密码重置成功,请牢记...'
        });
        this.setState({
          visible: false
        });
      }
    });
  }
  // 用户注销
  logout() {
    const { dispatch } = this.props;
    const router = this.context.router;
    dispatch(logoutUser(router));
  }
  render() {
    const user = get() || {};
    const { visible, isAdmin } = this.state;
    const contentClass = classNames('page-content');
    return (
      <div>
        <Header
          name={user.name}
          isAdmin={isAdmin}
          onClick={this.logout}
          resetPassword={this.onModalOpen}
        />
        <div className="clearfix" />
        <div className="page-container">
          {
            <div
              className="page-sidebar-warpper"
            >
              <Sidebar items={MENUS} />
            </div>
          }
          <div className="page-content-wrapper">
            <div className={contentClass}>
              {this.props.children}
            </div>
          </div>
        </div>
        {
          visible ?
            <Dialog
              visible={this.state.visible}
              animation="slide-fade"
              maskAnimation="fade"
              onClose={this.onClose}
              title={<div>修改密码</div>}
            >
              <ResetForm onSubmit={this.handleSubmit} onCancle={this.onModalClose} />
            </Dialog> : ''
        }
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  history: PropTypes.object
};

CoreLayout.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state) {
  return { user: state.basicReducer.user || {} };
}

export default connect(mapStateToProps)(CoreLayout);
