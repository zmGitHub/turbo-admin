import React, { Component, PropTypes } from 'react';
// 只引入核心模块
import echarts from 'echarts/lib/echarts';
import elementResizeEvent from 'element-resize-event';


class Echarts extends Component {
  // 首次创建
  componentDidMount() {
    const { type, onEvents, onChartReady } = this.props;
    // 引入所需的 echart 类型
    require(`echarts/lib/chart/${type}`);
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    const echart = this.renderEchart();
    Object.keys(onEvents).map((eventName) => {
      if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
        // 事件绑定
        echart.on(eventName, (params) => onEvents[eventName](params, echart));
      }
      return null;
    });

    // 返回 echart 实例给调用者
    if (typeof onChartReady === 'function') {
      onChartReady(echart);
    }

    // 监听元素大小变化重新渲染 echart
    elementResizeEvent(this.refs.echartsElement, () => echart.resize());
  }

  // 更新 echart
  componentDidUpdate() {
    this.renderEchart();
  }

  // 创建 echart 对象
  getEchartInstance() {
    // 如果存在实例则获取 否则创建
    return echarts.getInstanceByDom(this.refs.echartsElement)
      || echarts.init(this.refs.echartsElement);
  }

  componentWillUnmont() {
    echarts.dispose(this.refs.echartsElement);
  }

  // 渲染 echart
  renderEchart() {
    const { options, isLoading, loadingOption } = this.props;
    // 获取 echart 实例
    const echartObj = this.getEchartInstance();
    echartObj.setOption(options);
    // 是否显示 loading 效果
    if (isLoading) {
      echartObj.showLoading('default', loadingOption);
    } else {
      echartObj.hideLoading();
    }
    return echartObj;
  }
  render() {
    const { className, width, height } = this.props;
    return (
      <div
        ref="echartsElement"
        className={className}
        style={{ width, height }}
      />
    );
  }
}

Echarts.propTypes = {
  type: PropTypes.oneOfType(['bar', 'pie', 'radar', 'line']),
  options: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  loadingOption: PropTypes.object,
  onEvents: PropTypes.object,
  onChartReady: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

Echarts.defaultProps = {
  type: 'bar',
  isLoading: false,
  loadingOption: {
    text: '加载中...',
    color: '#c23531',
    textColor: '#000',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0
  },
  className: '',
  width: '100%',
  height: '500px',
  onEvents: {},
  onChartReady() {}
};

export default Echarts;
