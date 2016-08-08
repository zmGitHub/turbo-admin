import React, { Component, PropTypes } from 'react';

class Table extends Component {
  render() {
    return (
      <div className="table-scrollable">
        <table className={this.props.className}>
          {this.props.children}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default Table;
