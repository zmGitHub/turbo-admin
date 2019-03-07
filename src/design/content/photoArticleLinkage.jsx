import React, { PureComponent, Fragment } from 'react'
import { Input,  message, Spin, Icon } from 'antd'
import { connect } from 'dva'
import { is, append, remove, prop } from 'ramda'

const { Search } = Input

@connect()
class PhotoArticleLinkageDesign extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    config: {
      items: []
    }
  }

  constructor(props) {
    super(props)
    const { config: { data } } = props
    this.state = {
      searchingItem: false,
      list:data.items
    }
  }

  // 删除官方资讯
  deleteOfficialItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { list } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, list)
    this.setState({ list: newItems }, () => {
      onChange({ id, key: 'items', value: newItems })
    })
  }

    // 添加官方资讯

  addOfficialItem = (articleId) => {
    if (articleId && is(Number, +articleId)) {
      const { config: { id }, onChange, dispatch } = this.props
      this.setState({ searchingItem: true })
      dispatch({
        type: 'component/serviceData',
        payload: {
          ids: articleId,
          path: "design/graphic-carousel"
        },
        callback: (res) => {
          const data = prop('_DATA_', res)
          if (res && data[0]) {
            const { hisenseMenu, mainImage, name, articleDesc, createdAt, readTime } = data[0]
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
                key: 'items',
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

  render() {
    const { searchingItem, list } = this.state
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
      </Fragment>
    );
  }
}

export default PhotoArticleLinkageDesign
