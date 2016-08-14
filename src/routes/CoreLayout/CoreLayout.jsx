import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from './Action';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../../styles/app.scss';
import './CoreLayout.scss';

class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const { dispatch } = this.props;
    dispatch(logoutUser()).then(() => {
      this.props.history.push('login');
    });
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <Header name={user.nickname} onClick={this.logout} />
        <div className="clearfix" />
        <div className="page-container">
          <div className="page-sidebar-warpper">
            <Sidebar />
          </div>
          <div className="page-content-wrapper">
            <div className="page-content">
              {this.props.children}
            </div>
          </div>
        </div>
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

function mapStateToProps(state) {
  console.log(state.basicReducer.user);
  return { user: state.basicReducer.user || {} };
}

export default connect(mapStateToProps)(CoreLayout);
