import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './component/Actions';
import Form from './Form';
import logo from './logo-light.png';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(values) {
    const { dispatch } = this.props;
    // 用户登录
    dispatch(loginUser(values)).then((res) => {
      if (res.ok) {
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="login">
        <div className="logo">
          <img src={logo} alt="海尔-备件管理" />
        </div>
        <div className="content">
          <Form onSubmit={this.login} />
        </div>
        <div className="copyright">
          2016 &copy; 海尔集团
        </div>
      </div>
    );
  }
}

// 将 user 模块的 state 映射到当前登录
function mapStateToprops(state) {
  return { user: state.user };
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default connect(mapStateToprops)(Login);

