import React, { Component, PropTypes } from 'react';
import SidebarItem from './SidebarItem';

class SidebarSub extends Component {
  render() {
    const items = () => {
      this.props.children.map((item, index) => {
        return (<SidebarItem
          key={`sidebar.sub.item.${index}`}
          children={item.children}
          name={item.name}
          icon={item.icon}
        />);
      });
    };
    return (
      <ul className="sub-menu">
        {items()}
      </ul>
    );
  }
}

SidebarSub.propTypes = {
  children: PropTypes.array
};

export default SidebarSub;
