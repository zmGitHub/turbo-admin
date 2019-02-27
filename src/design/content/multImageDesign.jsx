import React, { Fragment, PureComponent } from 'react'
import { Switch, Icon, Button, Collapse, Slider} from 'antd'
import { concat, update, remove, last } from 'ramda'
// import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'
import { uniqueId } from '@/utils'

import './index.less'

const { Panel } = Collapse

const HeaderItem = ({ index, onDelete }) => (
  <div>
    <div className="multImage-item-header">
      <div className="title">图片项({index})</div>
      <div className="actions">
        <Icon onClick={onDelete} type="delete" />
      </div>
    </div>
  </div>
)


class MultImageDesign extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    config: {
      items: []
    }
  }

  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    this.state = {
      multImageIndex: 0,
      imagePickerVisible: false,
      items: data.items
    }
  }

  // 添加图片
  addMultImageItem = () => {
    const key = uniqueId(6,7)
    const { items } = this.state
    const newItems = concat(items, [{ key, src: defaultImg }])
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
    console.log(items)
  }

    onSwitchChange = (value) => {
      const { config: { id }, onChange } = this.props
     onChange({ id, key: 'changeSwitch', value })
     console.log(this.props)
    }


  // 删除图片
  deleteMultImageItem = (event, index) => {
    event.stopPropagation()
    const { items } = this.state
    const newItems = remove(index, 1, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 修改图片
  onImageChange = (imgs) => {
    if (imgs && imgs.length) {
      const imgObj = last(imgs)
      const { items, multImageIndex } = this.state
      const multImageItem = items[multImageIndex]
      multImageItem.src = imgObj.url
      const newItems = update(multImageIndex, multImageItem, items)
      this.setState({ imagePickerVisible: false, items: newItems }, () => {
        this.onPropsChange(newItems)
      })
    } else {
      this.setState({ imagePickerVisible: false})
    }

  }

  // 修改跳转
  updateMultImageItem = (index, url) => {
    const { items } = this.state
    const multImageItem = items[index]
    multImageItem.url = url
    const newItems = update(index, multImageItem, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 选择图片
  openImagePicker = (multImageIndex) => {
    this.setState({ multImageIndex, imagePickerVisible: true })
  }

  // 修改多张图片的 data
  onPropsChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'items', value })

  }
  // 根据滑块值修改样式

  onAfterChange = (value) => {
    const {config: { id,data:items }} = this.props
    console.log(value)
    console.log(id)
    console.log(items)
    // onChange({ id, key: 'items', value})
    console.log(this.props)

    // this.setState({items: newItems }, () =>{
    //   this.onPropsChange(newItems)
    // })
    // TODO:
    // const imgObj = last(imgs)
    // const { items, swiperIndex } = this.state
    // const swiperItem = items[swiperIndex]
    // swiperItem.src = imgObj.url
    // const newItems = update(swiperIndex, swiperItem, items)
    // this.setState({ imagePickerVisible: false, items: newItems }, () => {
    //   this.onPropsChange(newItems)
    // })
  }


  render() {
    const { items, imagePickerVisible } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">行列选择</h4>
          <div className="content-data-imager">
            <div>
              <Switch defaultChecked={!this.changeSwitch} onChange={this.onSwitchChange} checkedChildren="行" unCheckedChildren="列" />
            </div>
          </div>
        </div>

        <div className="content-data">
          <h4 className="content-data-title">图片列表</h4>
          <div className="content-data-multImage">
            <Collapse bordered={false}>
              {
                items.map((item, index) => (
                  <Panel header={<HeaderItem data-id={item.id} onDelete={(e) => { this.deleteMultImageItem(e, index) }} index={index+1} />} key={item.key}>
                    <div className="content-data-multImage-item">
                      <div className="content-data-multImage-item-panel">
                        <h4>图片</h4>
                        <div className="imager-content">
                          <img src={item.src} alt="单张图片" />
                          <div onClick={() => { this.openImagePicker(index) }} className="imager-content-mask"><Icon type="edit" /></div>
                        </div>
                      </div>
                      <div className="content-data-multImage-item-panel">
                        <h4>链接</h4>
                        <Linker url={item.url} onChange={(url) => { this.updateMultImageItem(index, url) }} />
                      </div>
                      <div className="content-data-multImage-item-panel">
                        <h4>占比</h4>
                        <Slider className="Proportion" defaultValue={50} marks={{0:"0",50:"50",100:"100"}} onAfterChange={this.onAfterChange}  />
                      </div>
                    </div>
                  </Panel>
                ))
              }
            </Collapse>
            <div className="content-data-multImage-add">
              <Button onClick={this.addMultImageItem} icon="plus-circle">添加图片</Button>
            </div>
          </div>
        </div>
        <ImagePicker visible={imagePickerVisible} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default MultImageDesign
