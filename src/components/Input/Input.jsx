import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './Input.scss';

class Input extends Component {
  render() {
    let input = null;
    const inputClass = classNames('form-control', this.props.className);
    switch (this.props.type) {
      case 'file':
        input = (
          <input
            {...this.props}
            className={inputClass}
            key="field"
          />
        );
        break;

      default:
        input = (
          <input
            {...this.props}
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
};

export default Input;
