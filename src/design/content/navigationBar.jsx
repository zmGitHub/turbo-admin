import React, { PureComponent, Fragment } from 'react'
import { Collapse, Icon , Button, Switch } from 'antd'
import Linker from '@/components/Linker'
import { concat, update, remove, last } from 'ramda'
import ImagePicker from '@/components/ImagePicker'
import defaultImg from '@/static/images/x.png'
import TextArea from './common/textArea'
import { uniqueId } from '@/utils'

const { Panel } = Collapse

const HeaderItem = ({ index, onDelete }) => (
  <div className="navigationBar-item-header">
    <div className="title">导航项({index})</div>
    <div className="actions">
      <Icon onClick={onDelete} type="delete" />
    </div>
  </div>)

class NavigationBarDesign extends PureComponent {
  static defaultProps = {
    onChange:()=>{},
    config: {
      items: [],
      lateralSwitch:false
    }
  }

  constructor(props) {
    super(props)
    const { config: { data } } = props
    const { items, lateralSwitch } = data
    this.state = {
      items,
      lateralSwitch,
      imagePickerVisible: false,
      navigationIndex: 0
    }
  }

  // 添加导航栏项
  addNavigationBarItem = () => {
    const key = uniqueId(6,7)
    const { items } = this.state
    const newItems = concat(items, [{ key, src: defaultImg,url:"",text:"文本" }])
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
      })
    }

  // 删除导航栏项
  deleteNavigationItem = (event, index) => {
      event.stopPropagation()
      const { items } = this.state
      const newItems = remove(index, 1, items)
      this.setState({ items: newItems }, () => {
        this.onPropsChange(newItems)
      })
    }

  // 修改导航栏图片
  onImageChange = (imgs) => {
    if (imgs && imgs.length) {
      const imgObj = last(imgs)
      const { items, navigationIndex } = this.state
      const navigationItem = items[navigationIndex]
      navigationItem.src = imgObj.url
      const newItems = update(navigationIndex, navigationItem, items)
      this.setState({ imagePickerVisible: false, items: newItems }, () => {
        this.onPropsChange(newItems)
      })
    } else {
      this.setState({ imagePickerVisible: false})
    }
  }

  // 修改导航栏跳转
  updateNavigationItem = (index, url) => {
    const { items } = this.state
    const navigationItem = items[index]
    navigationItem.url = url
    const newItems = update(index, navigationItem, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 修改导航栏的文字
  onTextChange = (index,words) => {
    const { items } = this.state
    const navigationItem = items[index]
    navigationItem.text = words
    const newItems = update(index, navigationItem, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 修改导航栏的 data
  onPropsChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'items', value })
  }

  // 选择图片
  openImagePicker = (navigationIndex) => {
    this.setState({ navigationIndex, imagePickerVisible: true })
  }

  // 横向开关改变
  onSwitchChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'lateralSwitch', value })
  }

  render() {
    const { items, imagePickerVisible,lateralSwitch } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">图片列表</h4>
          <div className="content-data-navigationBar">
            <Collapse bordered={false}>
              {
                items.map((item, index) => (
                  <Panel header={<HeaderItem data-id={item.id} onDelete={(e) => { this.deleteNavigationItem(e, index) }} index={index+1} />} key={item.key}>
                    <div className="content-data-navigationBar-item">
                      <div className="content-data-navigationBar-item-panel">
                        <h4>图片</h4>
                        <div className="imager-content">
                          <img src={item.src} alt="单张图片" />
                          <div onClick={() => { this.openImagePicker(index) }} className="imager-content-mask"><Icon type="edit" /></div>
                        </div>
                      </div>
                      <div className="content-data-navigationBar-item-panel">
                        <TextArea title="文字内容" value={item.text} onChange={(words) => { this.onTextChange(index, words) }} />
                      </div>
                      <div className="content-data-navigationBar-item-panel">
                        <h4>链接</h4>
                        <Linker url={item.url} onChange={(url) => { this.updateNavigationItem(index, url) }} />
                      </div>
                    </div>
                  </Panel>
                ))
              }
            </Collapse>
            <div className="content-data-swiper-add">
              <Button onClick={this.addNavigationBarItem} icon="plus-circle">添加导航项</Button>
            </div>
          </div>
        </div>

        <div className="content-data">
          <h4 className="content-data-title">图文横向排列</h4>
          <div className="content-data-navigationBar">
            <div className="content-data-swiper-add">
              <Switch defaultChecked={lateralSwitch} onChange={this.onSwitchChange} />
            </div>
          </div>
        </div>
        <ImagePicker visible={imagePickerVisible} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default NavigationBarDesign
