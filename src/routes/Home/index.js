import React, { Component, PropTypes } from 'react';
import '../../styles/app.scss';
class AppRoutes extends Component {
  render() {
    return (
      <div>
        <h3>header 123123123</h3>
        {this.props.children}
      </div>
    );
  }
}

AppRoutes.propTypes = {
  children: PropTypes.node.isRequired
};
export default AppRoutes;
