import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../Icon';
import SidebarSub from './SidebarSub';

class SidebarItem extends Component {
  // 检查 URL 地址是否有效
  checkURL() {
    let urlComponent = '';
    if (this.props.url) {
      urlComponent = (
        <Link path={this.props.url}>
          <Icon type={this.props.icon} />
          <span className="title">{this.props.name}</span>
        </Link>
      );
    } else {
      urlComponent = (
        <a href="javaScript:void(0);">
          <Icon type={this.props.icon} />
          <span className="title">{this.props.name}</span>
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
      <li>
        {this.checkURL() }
        {this.renderSubItem() }
      </li >
    );
  }
}

SidebarItem.propTypes = {
  icon: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.name,
  children: PropTypes.array
};

export default SidebarItem;
