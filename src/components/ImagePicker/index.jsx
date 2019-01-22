import React, { PureComponent } from 'react';
import { connect } from 'dva'
import classnames from 'classnames'
import { Modal, Menu, Button, Upload, Icon, Spin, Card, Pagination, message } from 'antd'
import { find, filter, map, includes, parseInt } from 'lodash'

import './index.less'

const uploadProps = {
  multiple: true,
  action: '/api/user/files/upload',
  listType: 'picture',
  className: 'upload-list-inline'
}

@connect(({ component, loading }) => ({
  categories: component.imageCategories,
  loading
}))
class ImageDesign extends PureComponent {

  static defaultProps = {
    visible: false
  }

  state = {
    categoryId: '1',
    itemIds: [],
    items: [],
    list: [],
    total: 0,
    page: 1
  }

  componentDidMount() {
    // 加载图片分组类别
    const { dispatch } = this.props
    dispatch({
      type: 'component/getImageCategory',
      callback: () => {
        this.getImageList()
      }
    })
  }

  getImageList = () => {
    const { dispatch } = this.props
    const { categoryId, page } = this.state
    dispatch({
      type: 'component/getImageList',
      payload: { categoryId, no: page, size: 12 },
      callback: ({ list, total }) => {
        this.setState({ list, total })
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
  onFileUploadChange = (res) => {
    console.log(res)
  }

  // 确认选择图片
  onConfirmChoose = () => {
    const { items } = this.state
    const { onChange } = this.props
    if (items.length) {
      onChange(items)
    } else {
      message.info('请至少选择一张图片')
    }
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

  render() {
    const { visible, categories, loading } = this.props
    const { categoryId, list, page, total, itemIds } = this.state
    const spinLoading = loading.effects['component/getImageList']
    return (
      <Modal
        width="960px"
        title="选择图片"
        visible={visible}
        footer={null}
      >
        <div className="x-img-picker">
          <div className="x-img-picker-content">
            <div className="x-img-picker-content-left">
              <Menu
                mode="inline"
                theme="dark"
                onClick={this.onMenuClick}
                selectedKeys={[categoryId]}
              >
                {
                  categories.length && categories.map(({ id, name }) => (
                    <Menu.Item key={id}>{name}</Menu.Item>
                  ))
                }
              </Menu>
            </div>
            <div className="x-img-picker-content-right">
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
                  <div className="x-image-list-content">
                    {
                      list.length && list.map(({ id, url, originName }) => (
                        <div key={`x_image_${id}`} data-id={id} className="x-image-list-content-item" onClick={this.chooseItem}>
                          <Card style={{ width: 113 }}>
                            <div className={classnames("x-image-list-content-item-img", { checked: includes(itemIds, id) })}>
                              <img src={url} alt={originName} />
                              <div className="choose-item"><Icon type="check" /></div>
                            </div>
                            <div className="x-image-list-content-item-footer">
                              <h3>{originName}</h3>
                            </div>
                          </Card>
                        </div>
                      ))
                    }
                  </div>
                </Spin>
                <div className="x-image-list-pager">
                  <Pagination defaultPageSize={12} onChange={this.onPageChange} current={page} total={total} />
                </div>
              </div>
            </div>
          </div>
          <div className="x-img-picker-footer">
            <Button onClick={this.onConfirmChoose}>确定</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ImageDesign
