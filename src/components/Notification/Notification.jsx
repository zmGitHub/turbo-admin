import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Notice from './Notice';

import './Notification.scss';

const POSITIONS = {
  topCenter: 'toast-top-center',
  topLeft: 'toast-top-left',
  topRight: 'toast-top-right',
  topFullWidth: 'toast-top-full-width',
  bottomCenter: 'toast-bottom-center',
  bottomRight: 'toast-bottom-right',
  bottomLeft: 'toast-bottom-left',
  bottomFullWidth: 'toast-bottom-full-width'
};

// 计数 notice
let seed = 0;
const now = Date.now();

// 生成唯一的 key
function getUUID() {
  return `turboNotification_${now}_${seed++}`;
}

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    };
  }

  // 添加 notice key 的值不是必须 除非要在代码中指定删除某个 notice
  add(notice) {
    const noticeProps = notice;
    const key = noticeProps.key = noticeProps.key || getUUID();
    this.setState(previousState => {
      const notices = previousState.notices;
      // 防止添加重复的数据
      if (!notices.filter(v => v.key === key).length) {
        return {
          notices: notices.concat(noticeProps)
        };
      }
    });
  }

  // 根据 移除 notice
  remove(key) {
    this.setState(previousState => {
      return {
        notices: previousState.notices.filter(notice => notice.key !== key)
      };
    });
  }

  render() {
    const { position, className } = this.props;
    const noticeNodes = this.state.notices.map((notice) => {
      return (
        <Notice
          {...notice}
          type={notice.type}
          title={notice.title}
          duration={notice.duration || 4.5}
          onClose={() => {
            this.remove(notice.key);
            notice.onClose();
          }}
        >
          {notice.content}
        </Notice>
      );
    });
    return (
      <div id="toast-container" className={classNames(POSITIONS[position], className)}>
        {noticeNodes}
      </div>
    );
  }
}

Notification.propTypes = {
  position: PropTypes.string,
  className: PropTypes.string
};

Notification.defaultProps = {
  position: 'topRight',
  className: ''
};


Notification.newInstance = function newNotificationInstance(properties) {
  const props = properties || {};
  // 构建 notification 的容器
  const div = document.createElement('div');
  // 将 notification append 到 body 后面 跟最外层 div 同级
  document.body.appendChild(div);
  // 这里估计会有问题: TODO
  const notification = ReactDOM.render(<Notification {...props} />, div);
  return {
    // 创建 notice
    notice(noticeProps) {
      notification.add(noticeProps);
    },
    // 删除指定的 notice
    removeNotice(key) {
      notification.remove(key);
    },
    component: notification,
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};

export default Notification;
