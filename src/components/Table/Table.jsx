import React, { Component, PropTypes } from 'react';
import Loader from '../Loaders';
import './Table.scss';

class Table extends Component {
  render() {
    const { children, isLoading, scrollable, ...rest } = this.props;
    return (
      <div className={scrollable ? 'table-scrollable' : ''}>
        <table {...rest} className={this.props.className}>
          {children}
        </table>
        <Loader type="ball-pulse-sync" className="loader-overlay" isLoading={isLoading} />
      </div>
    );
  }
}

Table.defaultProps = {
  isLoading: false,
  scrollable: true
};

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  scrollable: PropTypes.bool
};

export default Table;
