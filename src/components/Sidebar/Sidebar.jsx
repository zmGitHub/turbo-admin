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
          url: '',
          icon: 'cubes',
          children: [
            {
              id: 2,
              name: '上下架列表',
              url: '/',
              icon: 'share-alt',
              children: []
            },
            {
              id: 3,
              name: '发运操作费',
              url: 'dispatch',
              icon: 'paper-plane',
              children: []
            },
            {
              id: 19,
              name: '过站操作费',
              url: 'crossing',
              icon: 'exchange',
              children: []
            },
            {
              id: 4,
              name: '一次发运',
              url: 'dispatchprimary',
              icon: 'calendar',
              children: []
            },
            {
              id: 5,
              name: '二次发运',
              url: 'dispatchsecondary',
              icon: 'calendar-o',
              children: []
            },
            {
              id: 6,
              name: '过站发运',
              url: 'dispatchcrossing',
              icon: 'car',
              children: []
            },
            {
              id: 7,
              name: '旧件返工厂',
              url: 'factory',
              icon: 'history',
              children: []
            },
            {
              id: 8,
              name: '旧件返工贸',
              url: 'industry',
              icon: 'fax',
              children: []
            },
            // {
            //   id: 9,
            //   name: '工厂提货',
            //   url: 'dispatch',
            //   icon: 'shopping-cart',
            //   children: []
            // },
            // {
            //   id: 10,
            //   name: '发运手工录入',
            //   url: 'dispatch',
            //   icon: 'edit',
            //   children: []
            // },
            {
              id: 11,
              name: '索赔录入',
              url: 'cliam',
              icon: 'credit-card',
              children: []
            }
          ]
        }, {
          id: 12,
          name: '结算报表',
          icon: 'bar-chart-o',
          url: '',
          children: [
            {
              id: 13,
              name: '一级报表',
              url: 'reportprimary',
              icon: 'th',
              children: []
            },
            {
              id: 14,
              name: '二级报表',
              url: 'reportsecondary',
              icon: 'table',
              children: []
            }
          ]
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
        name={item.name}
        icon={item.icon}
        className="active open"
        children={item.children}
      />);
    });
    return (
      <div className="page-sidebar navbar-collapse collapse">
        <ul className="page-sidebar-menu">{renderItem()}</ul>
      </div>
    );
  }
}

export default Sidebar;
