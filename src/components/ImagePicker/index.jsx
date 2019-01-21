import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Modal, Menu, Button, Upload, Icon, Spin, Card, Pagination } from 'antd'

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

  query = {
    page: 1,
    size: 12
  }

  state = {
    categoryId: '1',
    list: [],
    total: 0,
    page: 1
  }

  componentDidMount() {
    // 加载图片分组类别
    const { dispatch } = this.props
    dispatch({
      type: 'component/getImageCategory',
      callback: (category) => {
        if (category && category.id) {
          this.getImageList(category.id)
        }
      }
    })
  }

  getImageList = (categoryId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'component/getImageList',
      payload: { categoryId, ...this.query },
      callback: ({ list, total }) => {
        this.setState({ list, total })
      }
    })
  }

  onFileUploadChange = (res) => {
    console.log(res)
  }

  onMenuClick = ({ key }) => {
    this.setState({ categoryId: key })
  }

  render() {
    const { visible, categories, loading } = this.props
    const { categoryId, list, page, total } = this.state
    const spinLoading = loading.effects['component/getImageList']
    console.log(spinLoading)
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
                  <Button disabled shape="circle" icon="delete" />
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
                        <div key={`x_image_${id}`} className="x-image-list-content-item">
                          <Card style={{ width: 113 }}>
                            <div className="x-image-list-content-item-img">
                              <img src={url} alt={originName} />
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
                  <Pagination defaultCurrent={1} total={total} />
                </div>
              </div>
            </div>
          </div>
          <div className="x-img-picker-footer">asdf</div>
        </div>
      </Modal>
    );
  }
}

export default ImageDesign
