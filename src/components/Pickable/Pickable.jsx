import React, { Component, PropTypes } from 'react';

// 获取默认选中的值
function getCheckedValue(children) {
  let value;
  React.Children.forEach(children, (radio) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
    }
  });
  return value;
}
class Pickable extends Component {
  constructor(props) {
    super(props);
    // 检查是否设置了默认值
    let value;
    if ('value' in props) {
      value = props.value;
    } else {
      value = getCheckedValue(props.children);
    }
    this.state = {
      value
    };

    // 监听 radio 的变化
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    } else {
      this.setState({
        value: getCheckedValue(nextProps.children)
      });
    }
  }

  onRadioChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }

  render() {
    const { className, children } = this.props;
    const { value } = this.state;
    const radioItems = React.Children.map(children, (radio) => {
      if (radio && radio.props) {
        return React.cloneElement(radio, {
          ...radio.props,
          key: `key_${radio.props.value}`,
          onChange: this.onRadioChange,
          checked: value === radio.props.value
        });
      }
    });
    return (
      <div className={`btn-group btn-group-devided ${className}`} data-toggle="buttons">
        {radioItems}
      </div>
    );
  }
}

Pickable.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.any,
  onChange: PropTypes.func
};

Pickable.defaultProps = {
  className: '',
  value: '',
  onChange() {}
};

export default Pickable;
