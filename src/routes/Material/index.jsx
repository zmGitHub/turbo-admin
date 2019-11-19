import React, { PureComponent } from 'react';
import { connect } from 'dva'
import classnames from 'classnames'
import { Modal, Popover, Menu, Button, Upload, Icon, Input, Spin, Card, Pagination, message, Empty } from 'antd'
import { head, find, filter, map, includes, parseInt, trim, isEmpty, split, last, replace } from 'lodash'

import './index.less'

const { Search } = Input;
const ButtonGroup = Button.Group;

const uploadProps = {
  multiple: true,
  action: '/api/wechat/img/uploadFile',
  listType: 'picture',
  className: 'upload-list-inline'
}

const imgFormat = '?x-oss-process=image/resize,m_mfit,h_260,w_260/sharpen,100'

@connect(({ component, loading }) => ({
  categories: component.imageCategories,
  loading
}))
class ImageDesign extends PureComponent {

  static defaultProps = {
    visible: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = prevState
    if (nextProps.visible !== visible) {
      return { visible: nextProps.visible }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      categoryId: '1',
      itemIds: [],
      items: [],
      list: [],
      total: 0,
      page: 1
    }
  }

  componentDidMount() {
    // 加载图片分组类别
    const { dispatch, categories } = this.props
    if (!categories.length) {
      dispatch({
        type: 'component/getImageCategory',
        callback: (category) => {
          if (category && category.id) {
            this.setState({ categoryId: category.id }, () => {
              this.getImageList()
            })
          }
        }
      })
    }
  }

  // 获取分类
  getCategories = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'component/getImageCategory',
    })
  }

  // 添加分类
  addCategory = (value) => {
    const name = trim(value)
    if (!isEmpty(name)) {
      const { dispatch } = this.props
      dispatch({
        type: 'component/addCategory',
        payload: { name },
        callback: (res) => {
          if (res && res.type === "success") {
            message.success("分类添加成功")
            this.getCategories()
          } else {
            message.error(res.text || "分类添加失败")
          }

        }
      })
    } else {
      message.warning("分组名称不能为空");
    }

  }

  getImageList = () => {
    const { dispatch } = this.props
    const { categoryId, page } = this.state
    dispatch({
      type: 'component/getImageList',
      payload: { categoryId, pageNo: page, pageSize: 12 },
      callback: ({ totalRows, content }) => {
        this.setState({ list: content || [], total: totalRows || 0 })
      }
    })
  }

  // 切换分页
  onPageChange = (page) => {
    this.setState({ page }, () => {
      this.getImageList()
    })
  }

  // 切换分类
  onMenuClick = ({ key }) => {
    this.setState({ categoryId: key, page: 1 }, () => {
      this.getImageList()
    })
  }

  // 文件上传成功
  onFileUploadChange = ({ file }) => {
    const { status, response, name } = file
    if (status === "done" && response.type === "success") {
      const { dispatch } = this.props
      const { categoryId } = this.state
      const path = replace(last(split(response.text, "|")), ";", "")
      dispatch({
        type: 'component/uploadImage',
        payload: { categoryId, originName: name, path },
        callback: (res) => {
          if (res && res.type === "success") {
            message.success("图片上传成功")
            this.getImageList();
          } else {
            message.error(res.text || "图片保存失败")
          }
        }
      })
    }
  }

  // 确认选择图片
  onConfirmChoose = () => {
    const { items } = this.state
    const { onChange } = this.props
    if (items.length) {
      // 清空选中的图片
      this.setState({ items: [], itemIds: [] }, () => {
        onChange(items)
      })
    } else {
      message.info('请至少选择一张图片')
    }
  }

  onChanceChoose = () => {
    const { onChange } = this.props
    this.setState({ items: [], itemIds: [] }, () => {
      onChange()
    })
  }

  // 选择图片
  chooseItem = (event) => {
    const { currentTarget } = event
    const { list, items, itemIds } = this.state
    const id = parseInt(currentTarget.getAttribute('data-id'))
    const imageItem = find(list, (item) => item.id === id )
    let newItems = items
    if (includes(itemIds, id)) {
      newItems = filter(items, (item) => item.id !== id)
    } else {
      newItems.push(imageItem)
    }
    const ids = map(newItems, (item) => item.id)
    this.setState({ items: newItems, itemIds: ids })
  }

  preventDefault = (event) => {
    event.stopPropagation()
  }

  // 删除分类
  onRemoveItem = (event) => {
    event.stopPropagation()
    const { dispatch, categories } = this.props
    const { confirm } = Modal;
    const { currentTarget } = event
    const id = currentTarget.getAttribute('data-id')
    const { categoryId } = this.state
    confirm({
      title: '确认删除当前分类?',
      content: '该分类下的图片将不可用',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'component/removeImage',
          payload: id,
          callback: (res) => {
            if (res && res.type === "success") {
              message.success("分类删除成功")
              this.getCategories()
              if(categoryId === id) {
                const resetId = head(categories)
                if (resetId && resetId.id) {
                  this.setState({ categoryId: resetId.id }, () => {
                    this.getImageList()
                  })
                } else {
                  this.setState({ list: [], total: 0 })
                }
              } else {
                this.getImageList();
              }
            } else {
              message.error(res.text || "分类删除失败")
            }
          }
        })
      }
    });
  }

  // 更新分类
  updateCategoryItem = (value, oldValue, id) => {
    if (value !== oldValue) {
      const name = trim(value)
      if (!isEmpty(name)) {
        const { dispatch } = this.props
        dispatch({
          type: 'component/updateCategory',
          payload: { id, name: value },
          callback: (res) => {
            if (res && res.type === "success") {
              this.getCategories()
            } else {
              message.error(res.text || "分类更新失败")
            }
          }
        })
      } else {
        message.warning("名称不能为空")
      }
    }
  }

  render() {
    const { categories, loading } = this.props
    const { categoryId, list, page, total, itemIds } = this.state
    const spinLoading = loading.effects['component/getImageList']
    return (
      <div className="x-img-list">
        <div className="x-img-list-content">
          <div className="x-img-list-content-left">
            <div className="x-img-list-content-left-scroll">
              <Menu
                mode="inline"
                theme="dark"
                onClick={this.onMenuClick}
                selectedKeys={[`${categoryId}`]}
              >
                {
                  categories.length > 0 && categories.map(({ id, name }) => (
                    <Menu.Item key={`${id}`}>
                      <div className="item-name">
                        <div className="item-name-text">{name}</div>
                      </div>
                      <div className="item-actions">
                        <div data-id={id} onClick={this.onRemoveItem}>
                          <Icon type="delete" />
                        </div>
                        <div onClick={this.preventDefault}>
                          <Popover content={<Search enterButton="修改" defaultValue={name} data-id={id} onSearch={(value) => this.updateCategoryItem(value, name, id)} />} trigger="hover">
                            <Icon type="edit" />
                          </Popover>
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </div>
            <div className="x-img-list-content-left-footer">
              <Search
                placeholder="添加分组"
                enterButton="添加"
                onSearch={this.addCategory}
              />
            </div>
          </div>
          <div className="x-img-list-content-right">
            <div className="x-uploader-actions">
              <div className="x-uploader-actions-tool">
                <Button shape="circle" icon="check-circle" />
                <Button disabled={itemIds.length === 0} shape="circle" icon="delete" />
              </div>
              <div className="x-uploader-actions-uploader">
                <Upload {...uploadProps} onChange={this.onFileUploadChange}>
                  <Button>
                    <Icon type="upload" /> 本地上传
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="x-image-list">
              <Spin spinning={spinLoading}>
                <div className={classnames("x-image-list-content", { center: list.length === 0 })}>
                  {
                    list.length > 0 ? list.map(({ id, path, originName }) => (
                      <div key={`x_image_${id}`} data-id={id} className="x-image-list-content-item" onClick={this.chooseItem}>
                        <Card style={{ width: 113 }}>
                          <div className={classnames("x-image-list-content-item-img", { checked: includes(itemIds, id) })}>
                            <img src={`${path}${imgFormat}`} alt={originName} />
                            <div className="choose-item"><Icon type="check" /></div>
                          </div>
                          <div className="x-image-list-content-item-footer">
                            <h3>{originName}</h3>
                          </div>
                        </Card>
                      </div>
                    )) : <Empty description="暂无图片" />
                  }
                </div>
              </Spin>
              <div className="x-image-list-pager">
                <Pagination defaultPageSize={12} onChange={this.onPageChange} current={page} total={total} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDesign
