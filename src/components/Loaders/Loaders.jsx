import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './loaders.scss';

const TYPES = {
  'ball-pulse': 3,
  'ball-grid-pulse': 9,
  'ball-clip-rotate': 1,
  'ball-clip-rotate-pulse': 2,
  'square-spin': 1,
  'ball-clip-rotate-multiple': 2,
  'ball-pulse-rise': 5,
  'ball-rotate': 1,
  'cube-transition': 2,
  'ball-zig-zag': 2,
  'ball-zig-zag-deflect': 2,
  'ball-triangle-path': 3,
  'ball-scale': 1,
  'line-scale': 5,
  'line-scale-party': 4,
  'ball-scale-multiple': 3,
  'ball-pulse-sync': 3,
  'ball-beat': 3,
  'line-scale-pulse-out': 5,
  'line-scale-pulse-out-rapid': 5,
  'ball-scale-ripple': 1,
  'ball-scale-ripple-multiple': 3,
  'ball-spin-fade-loader': 8,
  'line-spin-fade-loader': 8,
  'triangle-skew-spin': 1,
  'ball-grid-beat': 9,
  'semi-circle-spin': 1,
  pacman: 5
};

class Loader extends Component {
  // 根据 loader 的类型计算 div 生产的数量
  range(index) {
    let i = -1;
    const arr = [];
    while (++i < index) {
      arr.push(i);
    }
    return arr;
  }
  // 渲染 loader 所要的 div
  renderDIV(n) {
    return <div key={n} />;
  }

  render() {
    const { type, isLoading, className } = this.props;
    const DIVS = this.range(TYPES[type]);
    const classes = classnames({
      loader: true,
      hide: !isLoading,
      show: isLoading
    }, className);
    return (
      <div className={classes}>
        <div className={`loader-inner ${type}`}>
          {DIVS.map(this.renderDIV)}
        </div>
      </div>
    );
  }
}

Loader.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool
};

Loader.defaultProps = {
  type: 'ball-pulse',
  isLoading: false
};

export default Loader;
