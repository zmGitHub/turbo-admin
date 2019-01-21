import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Modal, Menu, Button, Upload, Icon } from 'antd'

import './index.less'

const uploadProps = {
  action: '/api/user/files/upload',
  listType: 'picture'
}

@connect()
class ImageDesign extends PureComponent {

  static defaultProps = {
    visible: false
  }

  componentDidMount() {
    console.log('组件加载...')
  }

  render() {
    const { visible } = this.props
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
              >
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu>
            </div>
            <div className="x-img-picker-content-right">
              <div className="x-uploader-actions">
                <div className="x-uploader-actions-tool">
                  <Button shape="circle" icon="check-circle" />
                  <Button disabled shape="circle" icon="delete" />
                </div>
                <div className="x-uploader-actions-uploader">
                  <Upload {...uploadProps}>
                    <Button>
                      <Icon type="upload" /> 本地上传
                    </Button>
                  </Upload>
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
