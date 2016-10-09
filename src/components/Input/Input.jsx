import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './Input.scss';

class Input extends Component {
  render() {
    let input = null;
    const { className, ...rest} = this.props;
    const inputClass = classNames('form-control', className);
    switch (this.props.type) {
      case 'file':
        input = (
          <input
            {...rest}
            className={inputClass}
            key="field"
          />
        );
        break;

      default:
        input = (
          <input
            {...rest}
            className={inputClass}
            key="field"
          />
        );
        break;
    }
    return input;
  }
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  values: PropTypes.string,
};

export default Input;
