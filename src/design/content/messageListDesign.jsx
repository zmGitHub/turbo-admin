
import React, { PureComponent, Fragment } from 'react'
import { Input, Switch, message, Checkbox, Spin, Icon } from 'antd'
import { connect } from 'dva'
import { is, append, remove, head } from 'ramda'

const { Group } = Checkbox
const { Search } = Input

const plainOptions = [
  { label: '分类', value: 'type' },
  { label: '名称', value: 'name' },
  { label: '描述', value: 'desc' },
  { label: '日期', value: 'date' },
  { label: '阅读', value: 'read' },
]

@connect()
class MessageListDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    this.state = {
      ...data,
      searchingItem: false,
      searchingTag: false,
    }
  }

  onDisplyaChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'display', value })
  }

  onInlineChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'inlineStyle', value })
  }

  // 删除官方资讯
  deleteOfficialItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { list } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, list)
    this.setState({ list: newItems }, () => {
      onChange({ id, key: 'list', value: newItems })
    })
  }

  // 添加官方资讯
  addOfficialItem = (articleId) => {
    if (articleId && is(Number, +articleId)) {
      const { config: { id }, onChange, dispatch } = this.props
      this.setState({ searchingItem: true })
      dispatch({
        type: 'component/getArticle',
        payload: articleId,
        callback: (res) => {
          if (res && res.id) {
            const { hisenseMenu, mainImage, name, articleDesc, createdAt, readTime } = res
            this.setState(({ list }) => ({
              searchingItem: false,
              list: append({
                id: articleId,
                tag: hisenseMenu.name,
                name,
                mainImage,
                articleDesc,
                createdAt,
                readTime
              }, list)
            }), () => {
              const { list } = this.state
              onChange({
                id,
                key: 'list',
                value: list
              })
            })

          } else {
            this.setState({ searchingItem: false })
            message.info('未找到文章, 请确认文章ID是否存在')
          }
        }
      })
    } else {
      message.info('请输入文章 ID')
    }
  }

  // 删除资讯 menu
  deleteMenuItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { types } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, types)
    this.setState({ types: newItems }, () => {
      onChange({ id, key: 'types', value: newItems })
    })
  }

  // 添加资讯Menu
  addMenuItem = (menuId) => {
    if (menuId && is(Number, +menuId)) {
      const { config: { id }, onChange, dispatch } = this.props
      this.setState({ searchingTag: true })
      dispatch({
        type: 'component/getMenuInfo',
        payload: menuId,
        callback: (res) => {
          if (res && res.length > 0) {
            this.setState(({ types }) => ({
              searchingTag: false,
              types: append(head(res), types)
            }), () => {
              const { types } = this.state
              onChange({
                id,
                key: 'types',
                value: types
              })
            })

          } else {
            this.setState({ searchingTag: false })
            message.info('未找到标题分类, 请确认标题分类ID是否存在')
          }
        }
      })
    } else {
      message.info('请输入标题分类 ID')
    }
  }

  render() {
    const { searchingItem, searchingTag,  inlineStyle, display, list, types } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">官方资讯列表</h4>
          <div className="content-data-article">
            <Spin spinning={searchingItem}>
              <div className="list-conent">
                {
                  list.map((item, index) => (
                    <div key={`item_${item.id}_${index}`} className="list-conent-item" onClick={this.deleteOfficialItem}>
                      <div className="name">{item.id}-{item.name}</div>
                      <div className="actions" data-index={index} onClick={this.deleteOfficialItem}>
                        <Icon type="delete" />
                      </div>
                    </div>
                  ))
                }
              </div>
              <Search
                type="number"
                placeholder="请输入资讯/文章ID"
                enterButton="添加"
                onSearch={this.addOfficialItem}
              />
            </Spin>
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">标题分类列表</h4>
          <div className="content-data-article">
            <Spin spinning={searchingTag}>
              <div className="list-conent">
                {
                  types.map((item, index) => (
                    <div key={`item_${item.menuId}_${index}`} className="list-conent-item">
                      <div className="name">{item.menuId > 0 ? `${item.menuId}-`:''}{item.menuName}</div>
                      {item.menuId > 0?  (
                        <div className="actions" data-index={index} onClick={this.deleteMenuItem}>
                          <Icon type="delete" />
                        </div>
                      ) : null}
                    </div>
                  ))
                }
              </div>
              <Search
                type="number"
                placeholder="标题分类ID"
                enterButton="添加"
                onSearch={this.addMenuItem}
              />
            </Spin>
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">模式</h4>
          <div className="content-data-article">
            <div className="label">横向模式</div>
            <Switch defaultChecked={inlineStyle} onChange={this.onInlineChange} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">展示</h4>
          <div className="content-data-article">
            <Group options={plainOptions} defaultValue={display} onChange={this.onDisplyaChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MessageListDesign
