import React, { Component, PropTypes } from 'react';
import SidebarItem from './SidebarItem';

class SidebarSub extends Component {
  render() {
    return (
      <ul className="sub-menu">
        {this.props.children.map((item, index) => {
          return (<SidebarItem
            key={`sidebar.sub.item.${index}`}
            children={item.children}
            url={item.url}
            name={item.name}
            icon={item.icon}
          />);
        })}
      </ul>
    );
  }
}

SidebarSub.propTypes = {
  children: PropTypes.array
};

export default SidebarSub;
