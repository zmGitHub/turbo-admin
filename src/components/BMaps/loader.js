const $S = require('scriptjs');

export default function mapLoader(bootstrapURLKeys) {
  const URL = `http://api.map.baidu.com/api?v=2.0&ak=${bootstrapURLKeys}&callback=init`;
  const loadPromise = new Promise((resolve, reject) => {
    if (window.BMap) { // 如果已经加载则直接返回
      resolve(window.BMap);
      return;
    }
    // 定义回调函数 确保地图已经加载
    window.init = () => {
      resolve(window.BMap);
    };

    $S(URL, () => {
      (typeof window.BMap === 'undefined') && reject('百度地图初始化失败');
    });
  });
  return loadPromise;
}
