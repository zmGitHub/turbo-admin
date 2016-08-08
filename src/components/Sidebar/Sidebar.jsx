import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.scss';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: '备件详情',
          icon: 'user',
          url: 'dispatch',
          children: [
            {
              id: 1,
              name: 'children1',
              icon: 'cog',
              children: []
            },
            {
              id: 2,
              name: 'children2',
              icon: 'cogs',
              children: []
            },
            {
              id: 3,
              name: 'children3',
              icon: 'cog',
              children: []
            },
          ]
        }, {
          id: 2,
          name: 'test',
          icon: 'bank',
          children: []
        }, {
          id: 3,
          name: 'test1',
          icon: 'car',
          children: []
        }
      ]
    };
  }

  render() {
    const { items } = this.state;
    const renderItem = () => items.map((item, index) => {
      return (<SidebarItem
        key={`sidebar.item.${index}`}
        url={item.url}
        name={item.name} icon={item.icon}
        children={item.children}
      />);
    });
    return (
      <div className="page-sidebar navbar-collapse collapse">
        <ul className="page-sidebar-menu">{renderItem() }</ul>
      </div>
    );
  }
}

export default Sidebar;
