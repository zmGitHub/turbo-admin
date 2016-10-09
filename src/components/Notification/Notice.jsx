import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
// Notice 的类型
const TYPES = {
  success: 'toast-success',
  info: 'toast-info',
  warning: 'toast-warning',
  error: 'toast-error'
};
class Notice extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    const { duration } = this.props;
    // 创建定时器: 自动消除 Notice 组件
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }

  componentWillUnmount() {
    // 组件卸载时清除 timeout
    this.clearCloseTimer();
  }
  // 清除 timer
  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  // notice 关闭清除 timer 并卸载该 notice 组件
  close() {
    this.clearCloseTimer();
    this.props.onClose();
  }
  render() {
    const { type, title, className, children } = this.props;
    return (
      <div className={classNames('toast', TYPES[type], className)}>
        <button
          type="button"
          className="toast-close-button"
          onClick={this.close}
          role="button"
        >
          ×
        </button>
        {title ? <p className="toast-title">{title}</p> : null }
        <div className="toast-message">
          {children}
        </div>
      </div>
    );
  }
}

Notice.propTypes = {
  onClose: PropTypes.func,
  duration: PropTypes.number,
  children: PropTypes.any,
  type: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
};

Notice.defaultProps = {
  type: 'info',
  title: '',
  className: '',
  duration: 1.5,
  onClose() {}
};

export default Notice;
