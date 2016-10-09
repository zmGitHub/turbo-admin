import React, { Component, PropTypes } from 'react';
import mapLoader from './loader';
import './BMaps.scss';

const BMAP_ANCHOR_TOP_RIGHT = 1;
// 自定义控件类 (写的好烂)
function FullControl(Map) {
  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
  // 定义控件离地图的距离
  this.defaultOffset = new Map.Size(10, 10);
}
class BMaps extends Component {
  componentDidMount() {
    this.instanceBmap();
  }
    // 更新 echart
  componentDidUpdate() {
    this.instanceBmap();
  }
  instanceBmap(zoom = 5) {
    const { akKey } = this.props;
    mapLoader(akKey).then(map => {
      const mapInstance = new map.Map(this.refs.baiduMapDom, { minZoom: zoom });
      this.markers(mapInstance, map);
      const point = new map.Point(116.404, 39.915); // 创建点坐标(北京)
      mapInstance.centerAndZoom(point, zoom);
      mapInstance.enableScrollWheelZoom();
      this.fullControl(map, mapInstance);
      // 初始化自定义控件参数
      const fullControl = new FullControl(map);
      // 将控件添加到地图中
      mapInstance.addControl(fullControl);
    });
  }
  // 创建标注
  markers(mapInstance, map) {
    const { markers } = this.props;
    markers.forEach((marker) => {
      const { lng, lat } = marker.location; // 获取经纬度
      const point = new map.Point(lng, lat); // 创建坐标点
      const markerObj = new map.Marker(point); // 创建标注
      mapInstance.addOverlay(markerObj); // 添加到地图
      markerObj.addEventListener('mouseover', () => {
        this.openInfo(marker, map, mapInstance);
      });
      // markerObj.setAnimation(2); // 跳动的动画 后续判断最大的跳动
    });
  }
  // 创建 windowInfo
  openInfo(marker, map, mapInstance) {
    const opts = {
      width: 250, // 信息窗口宽度
      height: 80, // 信息窗口高度
      title: marker.auditMap.siteName || '未知网点', // 信息窗口标题
      enableMessage: true// 设置允许信息窗发送短息
    };
    const { lng, lat } = marker.location; // 获取经纬度
    const point = new map.Point(lng, lat);
    const html = this.content(marker); // 生成对应的文本内容
    const infoWindow = new map.InfoWindow(html, opts);  // 创建信息窗口对象
    mapInstance.openInfoWindow(infoWindow, point); // 开启信息窗口
  }
  // 全屏控件
  fullControl(Map, MapInstance) {
    // 让 FullControl继承 Control
    FullControl.prototype = new Map.Control();
    // 构建控件 DOM 节点
    FullControl.prototype.initialize = () => {
      const fullElement = document.createElement('i');
      fullElement.className = 'fa fa-expand full-map-button';
      fullElement.setAttribute('title', '全 屏');
      // 添加点击事件
      fullElement.onclick = () => {
        this.refs.baiduMapDom.classList.toggle('map-fullscreen');
        if (this.refs.baiduMapDom.classList.contains('map-fullscreen')) {
          this.instanceBmap(6);
        } else {
          this.instanceBmap(5);
        }
      };
      // 将创建的实例添加到地图容器中
      MapInstance.getContainer().appendChild(fullElement);
      return fullElement;
    };
  }
  // 创建 infoWindow 里面的内容
  content(marker) {
    return `<p>工单量: ${marker.ticketAmount} 单</p>
            <p>结算费用: ￥${marker.settlementCost}</p>`;
  }

  render() {
    const { className, width, height } = this.props;
    return (
      <div
        ref="baiduMapDom"
        className={className}
        style={{ width, height }}
      />
    );
  }
}

BMaps.propTypes = {
  akKey: PropTypes.string.isRequired,
  markers: PropTypes.array,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

BMaps.defaultProps = {
  width: '100%',
  height: '400px',
  markers: []
};

export default BMaps;
