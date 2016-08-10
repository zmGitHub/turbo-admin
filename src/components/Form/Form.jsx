import React, { PropTypes } from 'react';
import './Form.scss';

export const Form = props => {
  const { className = 'form' } = props;
  return (
    <form {...props} className={className} role="form">
      {props.children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default Form;
