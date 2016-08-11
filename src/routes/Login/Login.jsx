import React, { Component, PropTypes } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Button from 'components/Button';
import Icon from 'components/Icon';
import logo from './logo-light.png';
import './Login.scss';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="logo">
          <img src={logo} alt="海尔-备件管理" />
        </div>
        <div className="content">
          <Form className="login-form">
            <h3 className="form-title text-center">备件管理系统</h3>
            <div className="alert alert-danger display-hide">
              <Button className="close" data-close="alert" />
              <span>Enter any username and password. </span>
            </div>
            <div className="form-group">
              <Label className="control-label visible-ie8 visible-ie9">用户名</Label>
              <div className="input-icon">
                <Icon type="user" />
                <Input
                  className="placeholder-no-fix"
                  type="text"
                  placeholder="请输入登录名称"
                  name="nickname"
                />
              </div>
            </div>
            <div className="form-group">
              <Label className="visible-ie8 visible-ie9">密 码</Label>
              <div className="input-icon">
                <Icon type="lock" />
                <Input
                  className="placeholder-no-fix"
                  type="password"
                  placeholder="请输入用户密码"
                  name="password"
                />
              </div>
            </div>
            <div className="form-actions">
              <Button type="submit" className="blue btn-block">登 录</Button>
            </div>
          </Form>
        </div>
        <div className="copyright">
          2014 &copy; 海尔集团
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};

export default Login;
