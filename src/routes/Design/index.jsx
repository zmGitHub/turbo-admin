import React, { PureComponent, Fragment, Suspense } from 'react'
import { connect } from 'dva'
import { Layout, Icon } from 'antd'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import classnames from 'classnames'

import TemplateMaps from '@/templates'
import { uniqueId } from '@/utils'
import LeftSider from './leftSider'
import { Template, TemplateItem } from './templates'

import './index.less'

const { Content, Sider } = Layout;


// 拖拽元素点
const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

/**
 * 点击元素让他在视图区域内居中
 * scrollIntoView是web api 最新浏览器才支持
 * var element = document.getElementById("box");
 * element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
 */
const SortableItem = SortableElement(({ item }) => {
  const { key, component, content, style } = item
  const template = TemplateMaps[component]
  const Lazycomponent = React.lazy(() => template.component)
  return (
    <div className="drag">
      <div className="drag-component">
        <Suspense fallback={<div>Loading...</div>}>
          <Lazycomponent key={key} data={content.data} style={style} title='标题标题' />
        </Suspense>
      </div>
      <DragHandle />
      <div className="drag-tool">
        <div className="drag-tool-item"><Icon type="delete" /></div>
        <div className="drag-tool-item"><Icon type="arrow-up" /></div>
        <div className="drag-tool-item"><Icon type="arrow-down" /></div>
      </div>
    </div>
  )
});

const SortableList = SortableContainer(({ items, handleClick }) => (
  <div className="container">
    {items.map((item, index) => (
      <SortableItem key={`template_${item.key}`} index={index} item={item} handleClick={handleClick} />
    ))}
  </div>
));

@connect(({ design, loading }) => ({
  design,
  loading
}))
class Design extends PureComponent {
  state = {
    templateCollapse: false,
    settingCollapse: false,
    components: []
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { design, dispatch } = this.props;
    const sortItems = arrayMove(design.list, oldIndex, newIndex)
    dispatch({
      type: 'design/sort',
      payload: sortItems
    })
  }

  chooseModule = (components) => {
    this.setState({ templateCollapse: true, components })
  }

  reset = () => {
    this.setState({ templateCollapse: false, settingCollapse: false })
  }

  openSetting = (e) => {
    e.stopPropagation();
    this.setState({ settingCollapse: true })
  }

  // 添加组件到主控制区域
  addComponent = (config) => {
    const { dispatch } = this.props
    const key = uniqueId(8, 8)
    dispatch({
      type: 'design/add',
      payload: { ...config, key }
    })
  }

  render() {
    const { design } = this.props
    const { templateCollapse, settingCollapse, components } = this.state
    const contentStyle = classnames('x-design-content-panel-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    const settingStyle = classnames('x-design-setting', { active: settingCollapse })
    return (
      <Fragment>
        <LeftSider active={templateCollapse} handleClick={this.chooseModule} />
        <Template active={templateCollapse}>
          {
            components.map((item) => (
              <TemplateItem key={item} componentName={item} maps={TemplateMaps} handleClick={this.addComponent}  />
            ))
          }
        </Template>
        <Content className="x-design-content">
          <div onClick={this.reset} className="x-design-content-panel">
            <div className={contentStyle}>
              <SortableList helperClass="drag-el" items={design.list} onSortEnd={this.onSortEnd} useDragHandle />
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

export default Design
