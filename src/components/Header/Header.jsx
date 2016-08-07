import React from 'react';
import { IndexLink } from 'react-router';
import Icon from '../Icon';
import './Header.scss';
import logoUrl from './logo.png';

export const Header = () => (
  <div className="page-header navbar navbar-fixed-top">
    <div className="page-header-inner">
      <div className="page-logo">
        <IndexLink to="/">
          <img className="logo-default" src={logoUrl} alt="海尔审计" />
        </IndexLink>
        <Icon className="menu-toggler sidebar-toggler" />
      </div>
    </div>
  </div>
);

export default Header;
