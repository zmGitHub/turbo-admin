import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Alert.scss';

const TYPES = {
  success: 'alert-success',
  info: 'alert-info',
  warning: 'alert-warning',
  danger: 'alert-danger'
};

const Alert = (props) => {
  const { title, type, className, close, children, ...rest } = props;
  const alertClass = classnames('alert', TYPES[type], {
    'alert-dismissable': close
  }, className);
  return (
    <div {...rest} className={alertClass}>
      {close ? <i className="fa fa-close close" /> : ''}
      <strong>{title}</strong>
      {children}
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOfType(['success', 'info', 'warning', 'danger']),
  className: PropTypes.string,
  close: PropTypes.bool,
  children: PropTypes.any
};

Alert.defaultProps = {
  close: false
};

export default Alert;
