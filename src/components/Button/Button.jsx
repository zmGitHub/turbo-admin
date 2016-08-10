import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Button.scss';

export const Button = props => {
  const { type = 'button' } = props;
  const buttonClass = classNames('btn', props.className);
  return (
    <button {...props} className={buttonClass} type={type} role="button" />
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
};

export default Button;
