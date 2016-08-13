import React, { Component } from 'react';
import Form from './Form';
import logo from './logo-light.png';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(values) {
    console.log(values);
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

export default Login;
