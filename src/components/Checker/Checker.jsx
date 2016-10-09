import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import './Checker.scss';

const TYPES = {
  checkbox: 't-checkbox',
  radio: 't-radio'
};

class Checker extends Component {
  constructor(props) {
    super(props);
    let checked = false;
    if ('checked' in props) {
      checked = props.checked;
    } else {
      checked = false;
    }
    this.state = {
      checked
    };

    // 绑定 change 事件
    this.onChange = this.onChange.bind(this);
  }

  // 组件属性变化更改 state 值
  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  onChange(e) {
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked
      });
    }
    // 触发外部 change 事件
    this.props.onChange({
      target: {
        checked: e.target.checked,
        value: e.target.value,
        e
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      }
    });
  }

  render() {
    const { className, title, type, name, readOnly, disabled, ...rest } = this.props;

    const { checked } = this.state;
    let reChecked = checked;
    if (typeof reChecked === 'boolean') {
      reChecked = reChecked ? 1 : 0;
    }

    const htmlForID = `Checker__${Math.floor(Math.random() * 0xFFFF)}`;
    const checkerClass = classnames('t-checker', TYPES[type], className);
    return (
      <label className={checkerClass} htmlFor={htmlForID}>
        <input
          {...rest}
          type={type}
          id={htmlForID}
          name={name}
          checked={!!reChecked}
          readOnly={readOnly}
          disabled={disabled}
          onChange={this.onChange}
        />
        {title}
        <span />
      </label>
    );
  }
}

Checker.propTypes = {
  className: PropTypes.string,
  htmlForID: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

// 默认值设置
Checker.defaultProps = {
  type: 'checkbox',
  className: '',
  onChange: (f) => f
};

export default Checker;
