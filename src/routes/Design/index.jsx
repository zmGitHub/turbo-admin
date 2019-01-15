import React, { PureComponent, Fragment, Suspense } from 'react'
import { connect } from 'dva'
import _find from 'lodash/find'
import { Layout, Icon } from 'antd'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import classnames from 'classnames'
import TemplateMaps from '@/templates'
import { uniqueId } from '@/utils'
import Mdules from './modules'
import { Template, TemplateItem } from './templates'
import SettingPanel from './setting'

import './index.less'

const { Content } = Layout;
const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

@connect(({ design, loading }) => ({
  design,
  loading
}))
class Design extends PureComponent {
  state = {
    templateCollapse: false,
    settingCollapse: true,
    components: [],
    componentId: '',
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
    // TODO: 暂时关闭
    // this.setState({ templateCollapse: false, settingCollapse: false })
  }

  // 点击元素获取对应的样式编辑组件
  getElSetting = (event) => {
    const { currentTarget } = event
    const { componentId } = this.state
    // 让当前元素滚动到可视区域的正中间
    if(currentTarget && currentTarget.scrollIntoView) {
      currentTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }
    const id = currentTarget.getAttribute('data-id')
    if (componentId !== id) {
      this.setState({ componentId: id })
    }
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

  // 样式变化更新组件
  onStyleChange = (config) => {
    const { id, styleId, key, value, type } = config
    const { dispatch, design } = this.props
    const item = _find(design.list, listItem => listItem.key === id)
    // 定位到组件
    if (item && item.key) {
      // 定位组件里面的内容变化 还是样式变化
      if (type === 'style') {
        const componentStyle = _find(item.style, componentItem => componentItem.key === styleId)
        // 定位样式
        if (componentStyle && componentStyle.key) {
          const itemStyle = _find(componentStyle.items, editorItem => editorItem.key === key)
          // 定位样式属性
          if (itemStyle && itemStyle.key) {
            // 最终变动值
            itemStyle.value = value
          }
        }
      }
    }

    dispatch({
      type: 'design/update',
      payload: design.list
    })
  }

  render() {
    const { design } = this.props
    const { templateCollapse, settingCollapse, components, componentId } = this.state
    const contentStyle = classnames('x-design-content-panel-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    // 拖拽元素点
    const SortableItem = SortableElement(({ item }) => {
      const { key, component, content, style } = item
      const template = TemplateMaps[component]
      const Lazycomponent = React.lazy(() => template.component)
      return (
        <div className="drag">
          <div className="drag-component" data-id={key} onClick={this.getElSetting}>
            <Suspense fallback={<div>Loading...</div>}>
              <Lazycomponent id={`template_${+new Date()}`} key={`template_${+new Date()}`} data={content.data} style={style} title='标题标题' />
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

    const SortableList = SortableContainer(({ items }) => (
      <div className="container">
        {items.map((item, index) => (
          <SortableItem key={`template_${item.key}`} index={index} item={item} />
        ))}
      </div>
    ));
    return (
      <Fragment>
        <Mdules active={templateCollapse} handleClick={this.chooseModule} />
        <Template active={templateCollapse}>
          {
            components.map((item) => (
              <TemplateItem key={item} componentName={item} handleClick={this.addComponent}  />
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
        <SettingPanel items={design.list} active={settingCollapse} id={componentId} onChange={this.onStyleChange} />
      </Fragment>
    )
  }
}

export default Design
