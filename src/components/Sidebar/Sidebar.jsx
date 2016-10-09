import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import SidebarItem from './SidebarItem';
import avatar from './logo-light.png';
import './Sidebar.scss';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: '总体分析',
          icon: 'pie-chart',
          url: '/',
          children: []
        },
        {
          id: 2,
          name: '工贸审计',
          icon: 'map',
          url: '/industries',
          children: []
        },
        {
          id: 3,
          name: '网点审计',
          icon: 'location-arrow',
          url: '/siteindex',
          children: []
        },
        {
          id: 4,
          name: '异常数据',
          icon: 'exclamation-triangle',
          url: '',
          children: [
            {
              id: 5,
              name: '异地号',
              url: '/remote',
              icon: 'phone',
              children: []
            },
            {
              id: 6,
              name: '重复手机号',
              url: '/repeattel',
              icon: 'volume-control-phone',
              children: []
            },
            {
              id: 7,
              name: '手机连号',
              url: '/telNumber',
              icon: 'retweet',
              children: []
            },
            {
              id: 8,
              name: '机编连号',
              url: '/machinecode',
              icon: 'barcode',
              children: []
            },
            {
              id: 9,
              name: '电子保修卡',
              url: '/warranty',
              icon: 'credit-card',
              children: []
            },
            {
              id: 10,
              name: '洗衣机服务措施',
              url: '/washerservice',
              icon: 'tty',
              children: []
            },
            {
              id: 11,
              name: '冰箱服务措施',
              url: '/fridge',
              icon: 'truck',
              children: []
            }
          ]
        },
        {
          id: 12,
          name: '用户角色',
          url: '',
          icon: 'group',
          children: [
            {
              id: 13,
              name: '用户管理',
              url: '/user',
              icon: 'user-plus',
              children: []
            },
            {
              id: 14,
              name: '角色管理',
              url: '/role',
              icon: 'cogs',
              children: []
            }
          ]
        }
      ]
    };
  }

  render() {
    const { items } = this.props;
    return (
      <div className="page-sidebar navbar-collapse collapse">
        <div className="page-sidebar-header">
          <img alt="审计后台" src={avatar} />
          <small>审计后台</small>
          <span className="sidebar-icon no-margin">
            <Icon type="dashboard" className="fa-1x" />
          </span>
        </div>
        <ul className="page-sidebar-menu">
          {
            items.map((item, index) => {
              return (<SidebarItem
                key={`sidebar.item.${index}`}
                url={item.url}
                name={item.name}
                icon={item.icon}
                className="active open"
                children={item.childMenus}
              />);
            })
          }
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  items: PropTypes.array
};

Sidebar.defaultProps = {
  items: []
};

export default Sidebar;
