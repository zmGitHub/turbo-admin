import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../../styles/app.scss';
import './CoreLayout.scss';

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className="clearfix" />
    <div className="page-container">
      <div className="page-sidebar-warpper">
        <Sidebar />
      </div>
      <div className="page-content-wrapper">
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
