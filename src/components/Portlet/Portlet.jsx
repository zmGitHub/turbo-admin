import React, { PropTypes } from 'react';
import Icon from '../Icon';
import './Portlet.scss';

export const Portlet = (props) => (
  <div className="portlet light">
    <div className="portlet-title">
      <div className="caption">
        <Icon className={props.color} type={props.icon} />
        <span className={`caption-subject ${props.color}`}> {props.title}</span>
        <span className="caption-helper"> {props.subTitle}</span>
      </div>
    </div>
    <div className="portlet-body">
      {props.children}
    </div>
  </div>
);

Portlet.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.any
};

export default Portlet;
