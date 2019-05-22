import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Icon, Collapse, Input, message, InputNumber } from 'antd'
import { connect } from 'dva'
import { head, last, append, propEq, update, find, concat, trim, map, is, remove } from 'ramda'
import classnames from 'classnames'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import { uniqueId, debounce, getPageQuery } from '@/utils'
import defaultImg from '@/static/images/x.png'
import hisenseLogo from '@/static/images/loading.png'

import './index.less'

const { Panel } = Collapse
const { Search } = Input

const HeaderItem = ({ pIndex, index, name, onClick }) => (
  <div className="category-header">
    <div className="category-header-title">{name}</div>
    <div className="category-header-action" data-pid={pIndex} data-index={index} onClick={onClick}>
      <Icon type="delete" />
    </div>
  </div>
)

@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.effects['dashboard/getTemplates']
}))
class CategoryEdit extends PureComponent {

  pid = ''

  id = ''

  state = {
    height: 108,
    imagePickerVisible: false,
    list: [],
    category: {},
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    const { id } = getPageQuery(location.pathname)

    dispatch({
      type: 'design/getDataById',
      payload: { id },
      callback: (res) => {
        if (res) {
          const { categories, height = 108 } = res
          const category = head(categories)
          this.setState({ list: categories, category, height })
        }
      }
    })
  }

  onImageChange = (images) => {
    if (images && images.length) {
      const imgObj = last(images)
      const { list } = this.state
      const category = list[this.pid]
      const children = category.children[this.id]
      children.url = imgObj.url
      update(this.id, children, category)
      this.setState({ imagePickerVisible: false, list: concat([], list)  })
    } else {
      this.setState({ imagePickerVisible: false})
    }
  }

  // 修改标题
  onTitleChange = debounce((pIndex, index, value) => {
    const title = trim(value)
    if (title) {
      const { list } = this.state
      const category = list[pIndex]
      const children = category.children[index]
      children.title = title
      update(index, children, category)
      this.setState({ list: concat([], list)  })
    } else {
      message.warning('标题不能为空')
    }
  }, 600)

  // 修改类目 ID
  onIdsChange = debounce((pIndex, index, value) => {
    const ids = trim(value)
    if (ids) {
      const { list } = this.state
      const { dispatch } = this.props
      const category = list[pIndex]
      const children = category.children[index]
      dispatch({
        type: 'component/getCategory',
        payload: { ids },
        callback: (res) => {
          if (res && res.length) {
            const items = map(({ current: { id, name, logo } }) => ({ id, name, logo }), res)
            children.ids = ids
            children.categories = items
            update(index, children, category)
            this.setState({ list: concat([], list)  })
          } else {
            message.info('消息获取失败, 请确认消息ID组')
          }
        }
      })
    } else {
      message.warning('请输入类目 ID 组')
    }
  }, 600)

  onCategoryLinkerChange = (url, index) => {
    const { list } = this.state
    const category = list[index]
    category.link = url
    update(index, category, list)
    this.setState({ list: concat([], list)  })
  }

  onLinkerChange = (url, pid, id) => {
    const { list } = this.state
    const category = list[pid]
    const children = category.children[id]
    children.link = url
    update(id, children, category)
    this.setState({ list: concat([], list)  })
  }

  // 删除一级类目
  deleteCategoryItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { list, category } = this.state
    const newItems = remove(dataset.index, 1, list)
    if (category.key === list[dataset.index].key) {
      this.setState({ list: newItems, category: head(newItems) || {} })
    } else {
      this.setState({ list: newItems })
    }
  }

  // 删除二级类目
  deleteSubCategoryItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { list } = this.state
    const category = list[dataset.pid]
    category.children = remove(dataset.index, 1, category.children)
    this.setState({ list: concat([], list) })
  }

  showImagePicker = ({ currentTarget }) => {
    const { pid, id } = currentTarget.dataset
    this.pid = pid
    this.id = id
    this.setState({ imagePickerVisible: true })
  }

  addCategory = (value) => {
    const ids = trim(value)
    if (ids) {
      const { dispatch } = this.props
      dispatch({
        type: 'component/serviceData',
        payload: { path: 'design/category', ids },
        callback: (res) => {
          if (res && res['_DATA_']) {
            const category = head(res['_DATA_'])
            if (category && category.current) {
              const { list } = this.state
              const { id, name } = category.current
              const key = uniqueId(8,9)
              const categories = append({ id, name, key, children: [] }, list)
              const current = head(categories)
              this.setState({ list: categories, category: current })
            } else {
              message.info('一级类目不存在')
            }
          } else {
            message.info('一级类目不存在')
          }
        }
      })
    } else {
      message.warn('请输入一级类目 ID')
    }
  }

  addSubCategory = (value, key) => {
    const title = trim(value)
    if (title) {
      const { list } = this.state
      const category = find(propEq('key', key), list)
      const uniqKey = uniqueId(6,8)
      const children = {
        key: uniqKey,
        title,
        categories: [],
      }
      category.children = append(children, category.children)

      this.setState({ list: concat([], list) })
    } else {
      message.warning('请输入二级分类标题')
    }
  }

  onCollapseChange = (key) => {
    if (key) {
      const { list, category } = this.state
      if (key !== category.key) {
        const current = find(propEq('key', key), list)
        this.setState({ category: current })
      }
    }
  }

  onHeightChange = (height) => {
    if (is(Number, height) && height > 0) {
      this.setState({ height })
    }
  }

  saveData = () => {
    const { list, height } = this.state
    if (list.length > 0) {
      const { dispatch, location } = this.props
      const { id } = getPageQuery(location.pathname)
      dispatch({
        type: 'design/update',
        payload: {
          id,
          data: JSON.stringify({ categories: list, height })
        },
        callback: (res) => {
          if (res) {
            message.success('更新成功')
          } else {
            message.error('更新失败')
          }
        }
      })
    } else {
      message.warn('数据不能为空')
    }
  }

  render() {
    const { height, category, list, imagePickerVisible } = this.state
    return (
      <div className="x-category">
        <div className="x-category-content">
          <Card
            title="编辑分类"
            extra={<Button onClick={this.saveData} type="primary">保存</Button>}
          >
            <div className="editor-left">
              <div className="editor-left-sidebar">
                {
                  list.map(({ key, name }) => (<div key={`sider_${key}`} className={classnames('item', { active: key === category.key })}>{name}</div>))
                }
              </div>
              <div className="editor-left-content">
                <div className="editor-left-content-card">
                  {
                    category.children && category.children.map(({ key, title, url, categories }) => (
                      <Fragment key={`category_${key}`}>
                        { url ? (
                          <div className="banner" style={{ height }}>
                            <img src={url || defaultImg} alt="banner" />
                          </div>
                        ) : null }
                        <div className="content">
                          <div className="content-item">
                            <div className="content-item-title">{title}</div>
                            <div className="content-item-card">
                              {
                                categories.map(({ id, name, logo }) => (
                                  <div key={`children_${id}`} className="content-item-card-unit">
                                    <img className="content-item-card-unit-img" src={logo || hisenseLogo} alt="card" />
                                    <div className="content-item-card-unit-title">{name}</div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ))
                  }
                  {
                    category.name ? (
                      <div className="footer">
                        <span>{category.name}频道</span>
                        <Icon type="right" />
                      </div>
                    ) : null
                  }
                </div>
              </div>
            </div>
            <div className="editor-right">
              <div className="editor-right-action">
                <div className="editor-right-action-header">
                  <div className="editor-right-action-header-left">海报高度</div>
                  <div className="editor-right-action-header-right">
                    <InputNumber min={1} defaultValue={height} onChange={this.onHeightChange} />
                  </div>
                </div>
                <div className="editor-right-action-header">
                  <div className="editor-right-action-header-left">分类设置</div>
                  <div className="editor-right-action-header-right">
                    <Search
                      allowClear
                      type="number"
                      placeholder="请输入一级类目 ID"
                      enterButton="添加"
                      style={{ width: 200 }}
                      onSearch={this.addCategory}
                    />
                  </div>
                </div>
                <div className="editor-right-action-content">
                  <Collapse bordered={false} accordion onChange={this.onCollapseChange}>
                    {
                      list.map(({ key, name, children, link }, categoryIndex) => (
                        <Panel key={key} header={<HeaderItem index={categoryIndex} name={name} onClick={this.deleteCategoryItem} />}>
                          <div className="category-item">
                            <div className="category-item-title">活动跳转链接</div>
                            <div className="category-item-content">
                              <Linker multiGoods={false} url={link} onChange={(url) => { this.onCategoryLinkerChange(url, categoryIndex) }} />
                            </div>
                          </div>
                          <div className="category-item">
                            <div className="category-item-title">
                              <span>二级分类列表</span>
                              <Search
                                placeholder="请输入二级分类标题"
                                enterButton="添加"
                                style={{ width: 180 }}
                                onSearch={(title) => { this.addSubCategory(title, key) }}
                              />
                            </div>
                            <div className="category-item-content">
                              <Collapse bordered={false}>
                                {
                                  children.map((item, subCategoryIndex) => (
                                    <Panel key={item.key} header={<HeaderItem pIndex={categoryIndex} index={subCategoryIndex} name={item.title} onClick={this.deleteSubCategoryItem} />}>
                                      <div className="sub-content">
                                        <span className="sub-content-title">类目海报</span>
                                        <div className="sub-content-right">
                                          <div className="img-content" data-pid={categoryIndex} data-id={subCategoryIndex} onClick={this.showImagePicker}>
                                            <img src={item.url || defaultImg} alt="类目海报" />
                                            <div className="img-content-mask"><Icon type="edit" /></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="sub-content">
                                        <span className="sub-content-title">类目标题</span>
                                        <div className="sub-content-right">
                                          <Input defaultValue={item.title} onChange={(event) => { this.onTitleChange(categoryIndex, subCategoryIndex, event.target.value) }} placeholder="请输入标题" />
                                        </div>
                                      </div>
                                      <div className="sub-content">
                                        <span className="sub-content-title">类目ID组</span>
                                        <div className="sub-content-right">
                                          <Input defaultValue={item.ids} onChange={(event) => { this.onIdsChange(categoryIndex, subCategoryIndex, event.target.value) }} placeholder="请输入类目ID组" />
                                        </div>
                                      </div>
                                      <div className="sub-content">
                                        <span className="sub-content-title">跳转链接</span>
                                        <div className="sub-content-right">
                                          <Linker multiGoods={false} url={item.link} onChange={(url) => { this.onLinkerChange(url, categoryIndex, subCategoryIndex) }} />
                                        </div>
                                      </div>
                                    </Panel>
                                  ))
                                }
                              </Collapse>
                            </div>
                          </div>
                        </Panel>
                      ))
                    }
                  </Collapse>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <ImagePicker visible={imagePickerVisible} onChange={this.onImageChange} />
      </div>
    );
  }
}

export default CategoryEdit
