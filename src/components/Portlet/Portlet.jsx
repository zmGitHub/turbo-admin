import React, { Component, PropTypes } from 'react';
import Loader from '../Loaders';
import Icon from '../Icon';
import './Portlet.scss';

class Portlet extends Component {
  render() {
    const {
      color,
      icon,
      title,
      subTitle,
      children,
      inputs,
      actions,
      subChildren,
      isLoading
    } = this.props;
    return (
      <div className="portlet light">
        <div className="portlet-title">
          <div className="caption">
            <Icon className={color} type={icon} />
            <span className={`caption-subject ${color}`}> {title}</span>
            <span className="caption-helper"> {subTitle}</span>
          </div>
          {actions || ''}
          {inputs || ''}
          {subChildren || ''}
        </div>
        <div className="portlet-body">
          {children}
          <Loader type="ball-pulse-sync" className="loader-overlay" isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

Portlet.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.any,
  subChildren: PropTypes.any,
  inputs: PropTypes.any,
  actions: PropTypes.any,
  isLoading: PropTypes.bool
};

export default Portlet;
