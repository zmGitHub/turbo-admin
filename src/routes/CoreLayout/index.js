import React from 'react';
import Header from '../../components/Header';
import '../../styles/app.scss';
import './CoreLayout.scss';
export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className="clearfix"></div>
    <div className="page-container">
    </div>
    <div className="page-content-wrapper">
      <div className="page-content">
        {children}
      </div>
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
