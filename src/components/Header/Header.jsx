import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Icon from '../Icon';
import './Header.scss';
import logoUrl from './logo.png';
import avatar from './avatar.png';

export const Header = (props) => (
  <div className="page-header navbar navbar-fixed-top">
    <div className="page-header-inner">
      <div className={`page-logo ${props.isAdmin ? '' : 'padding-left-10'}`}>
        <IndexLink to="/">
          <img className="logo-default" src={logoUrl} alt="海尔审计" />
        </IndexLink>
      </div>
      <div className="top-menu">
        <ul className="nav navbar-nav pull-right">
          <li className="dropdown dropdown-extended quick-sidebar-toggler" title="修改密码" onClick={props.resetPassword}>
            <Icon type="key" className="font-blue-sharp" />
          </li>
          <li className="dropdown dropdown-user dropdown-dark">
            <a href="javascript:;" className="dropdown-toggle">
              <img alt="用户管理" className="img-circle" src={avatar} />
              <span className="username username-hide-mobile">{props.name || '未设置'}</span>
            </a>
          </li>
          <li className="dropdown dropdown-extended quick-sidebar-toggler" onClick={props.onClick}>
            <span className="sr-only">Toggle Quick Sidebar</span>
            <Icon title="退 出" type="sign-out" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  name: PropTypes.string,
  isAdmin: PropTypes.bool,
  onClick: PropTypes.func,
  resetPassword: PropTypes.func
};

Header.defaultProps = {
  isAdmin: true
};
export default Header;
