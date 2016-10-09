import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../Icon';
import SidebarSub from './SidebarSub';

class SidebarItem extends Component {
  // 检查 URL 地址是否有效
  checkURL() {
    const { name, icon, url } = this.props;
    let urlComponent = '';
    if (this.props.url) {
      urlComponent = (
        <Link to={url} activeClassName="linkActive" onlyActiveOnIndex>
          <span className="title"> {name}</span>
          <span className="sidebar-icon">
            <Icon type={icon} />
          </span>
        </Link>
      );
    } else {
      urlComponent = (
        <a href="javaScript:void(0);">
          <span className="title"> {name}</span>
          <span className="arrow" />
          <span className="sidebar-icon">
            <Icon type={icon} />
          </span>
        </a>
      );
    }
    return urlComponent;
  }
  // 渲染下级菜单
  renderSubItem() {
    return <SidebarSub children={this.props.children} />;
  }
  render() {
    return (
      <li className={this.props.className}>
        {this.checkURL() }
        <SidebarSub children={this.props.children} />
      </li >
    );
  }
}

SidebarItem.propTypes = {
  icon: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.array,
  className: PropTypes.string
};

export default SidebarItem;
