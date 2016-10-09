import React, { Component, PropTypes } from 'react';
import Icon from 'components/Icon';

import './DashboardStat.scss';

class DashboardStat extends Component {
  render() {
    const { icon, amount, name, unit, rate, color } = this.props;
    const progressStyle = {
      width: `${rate}%`
    };
    return (
      <div className="dashboard-stat2">
        <div className="display">
          <div className="number">
            <h3 className={`font-${color}`}>
              {amount}
              <small className={`font-${color}`}>{unit}</small>
            </h3>
            <small>{name}</small>
          </div>
          <div className="icon">
            <Icon type={icon} />
          </div>
        </div>
        <div className="progress-info">
          <div className="progress">
            <div
              style={progressStyle}
              className={`progress-bar progress-bar-success ${color}`}
            >
              <span
                className="sr-only"
              >
                progress
              </span>
            </div>
          </div>
          <div className="status">
            <div className="status-title">
              {rate ? '占比率' : ''}
            </div>
            <div className="status-number">
              {rate ? `${rate} %` : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardStat.propTypes = {
  icon: PropTypes.string.isRequired,
  amount: PropTypes.number,
  name: PropTypes.string,
  unit: PropTypes.string,
  rate: PropTypes.number,
  color: PropTypes.string
};

DashboardStat.defaultProptypes = {
  amount: 0,
  rate: 0
};

export default DashboardStat;
