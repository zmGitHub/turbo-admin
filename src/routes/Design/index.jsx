import React, { PureComponent, Fragment } from 'react'
import { Layout, Icon } from 'antd'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import classnames from 'classnames'

import './index.less'

const { Content, Sider } = Layout;

// 拖拽元素点
const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

const SortableItem = SortableElement(() => (
  <div className="drag">
    <div className="drag-component">
      组件
    </div>
    <DragHandle />
    <div className="drag-tool">
      <div className="drag-tool-item"><Icon type="delete" /></div>
      <div className="drag-tool-item"><Icon type="delete" /></div>
      <div className="drag-tool-item"><Icon type="delete" /></div>
    </div>
  </div>
));

const SortableList = SortableContainer(({ items, handleClick }) => {
  return (
    <div className="container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} handleClick={handleClick} />
      ))}
    </div>
  );
});

export default class Dashboard extends PureComponent {
  state = {
    templateCollapse: false,
    settingCollapse: false,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10','Item 11', 'Item 21', 'Item 31', 'Item 14', 'Item 51', 'Item 61', 'Item 17', 'Item 18', 'Item 19', 'Item 11']
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const {items} = this.state;
    console.log(arrayMove(items, oldIndex, newIndex))
    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  }

  chooseModule = () => {
    this.setState({ templateCollapse: true })
  }

  reset = () => {
    this.setState({ templateCollapse: false, settingCollapse: false })
  }

  openSetting = (e) => {
    e.stopPropagation();
    this.setState({ settingCollapse: true })
  }

  render() {
    const { templateCollapse, settingCollapse, items } = this.state
    const designStyle = classnames('x-design-templates', { active: templateCollapse })
    const contentStyle = classnames('x-design-content-panel-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    const settingStyle = classnames('x-design-setting', { active: settingCollapse })
    return (
      <Fragment>
        <Sider onClick={this.chooseModule} className="x-design-modules">
          模板集合
        </Sider>
        <Sider width="375" className={designStyle}>
          <div className="x-design-templates-content">
            <div className="item">fuck</div>
          </div>
        </Sider>
        <Content className="x-design-content">
          <div onClick={this.reset} className="x-design-content-panel">
            <div className={contentStyle}>
              <SortableList helperClass="drag-el" items={items} onSortEnd={this.onSortEnd} useDragHandle />
            </div>
          </div>
        </Content>
        <Sider width="300" className={settingStyle}>
          参数配置
        </Sider>
      </Fragment>
    )
  }
}
