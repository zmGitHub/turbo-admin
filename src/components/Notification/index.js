import Notification from './Notification';

let notificationInstance = null;

// 创建唯一的 notification 实例
function getNotificationInstance(position) {
  if (notificationInstance) {
    return notificationInstance;
  }

  notificationInstance = Notification.newInstance({
    position: position || 'topRight'
  });

  return notificationInstance;
}

function empty() {
  return;
}

function notice(args) {
  args.onClose = args.onClose || empty;
  getNotificationInstance(args.position).notice(args);
}


const API = {
  open(args) {
    notice(args);
  },
  close(key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  destroy() {
    if (notificationInstance) {
      notificationInstance.destroy();
      notificationInstance = null;
    }
  }
};

export default API;
