import React from 'react';
import { IndexLink } from 'react-router';
import Icon from '../Icon';
import './Header.scss';
import logoUrl from './logo.png';
import avatar from './avatar.png';

export const Header = () => (
  <div className="page-header navbar navbar-fixed-top">
    <div className="page-header-inner">
      <div className="page-logo">
        <IndexLink to="/">
          <img className="logo-default" src={logoUrl} alt="海尔审计" />
        </IndexLink>
        <Icon className="menu-toggler sidebar-toggler" />
      </div>
      <div className="top-menu">
        <ul className="nav navbar-nav pull-right">
          <li className="dropdown dropdown-user dropdown-dark">
            <a href="javascript:;" className="dropdown-toggle">
              <img alt="用户管理" className="img-circle" src={avatar} />
              <span className="username username-hide-mobile">Nick</span>
            </a>
          </li>
          <li className="dropdown dropdown-extended quick-sidebar-toggler">
            <span className="sr-only">Toggle Quick Sidebar</span>
            <Icon title="退 出" type="sign-out" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
