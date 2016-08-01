import React from 'react';
import { IndexLink } from 'react-router';
import logoUrl from './logo.png';

require('./Header.scss');

export const Header = () => (
  <div className="page-header navbar navbar-fixed-top">
    <div className="page-header-inner">
      <div className="page-logo">
        <IndexLink to="/">
          <img className="logo-default" src={logoUrl} alt="海尔审计" />
        </IndexLink>
        <i className="menu-toggler sidebar-toggler"></i>
      </div>
    </div>
  </div>
);

export default Header;
