import React, { Component } from 'react';
import history from 'containers/history'; // 路由跳转
import { get as user, logout } from 'containers/auth'; // 用户接口
import { post, get } from 'containers/fetch';
import ReactDOM from 'react-dom';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import avatar from './avatar.png';
import './Lock.scss';

class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
    this.login = this.login.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.user = user() || {};
  }

  login(event) {
    event.preventDefault();
    const { password } = this.state;
    post('/api/user/login', {
      nickname: this.user.user.nickname,
      password
    });
  }

  removeUser() {
    logout();
    get('/api/user/logout').then(() => {
      history.go('/login');
    });
  }

  handleChange(event) {
    this.setState({ password: event.target.value.substr(0, 200) });
  }

  render() {
    const { password } = this.state;
    return (
      <div className="page-lock">
        <div className="page-body">
          <div className="lock-head">
            登录超时
          </div>
          <div className="lock-body">
            <div className="pull-left lock-avatar-block">
              <img src={avatar} className="lock-avatar" alt="备件管理" />
            </div>
            <Form className="lock-form pull-left" onSubmit={this.login}>
              <h4>{this.user.roleStr}</h4>
              <div className="form-group">
                <Input
                  className="form-control placeholder-no-fix"
                  value={password}
                  type="password"
                  autoComplete="off"
                  placeholder="请重新输入密码"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-actions">
                <Button type="submit" className="btn-success uppercase">登 录</Button>
              </div>
            </Form>
          </div>
          <div className="lock-bottom">
            <Button type="button" className="btn-link" onClick={this.removeUser}>注销当前用户</Button>
          </div>
        </div>
      </div>
    );
  }
}

Lock.newInstance = function newLockInstance(properties) {
  const props = properties || {};
  // 构建 lock 的容器
  const div = document.createElement('div');
  div.className = 'lock';
  // 将 lock append 到 body 后面 跟最外层 div 同级
  document.body.appendChild(div);
  ReactDOM.render(<Lock {...props} />, div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};

export default Lock;
