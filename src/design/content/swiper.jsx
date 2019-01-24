import React, { PureComponent, Fragment } from 'react';
import { Collapse, Icon , Button } from 'antd'
import { concat, update, remove, last } from 'ramda'
import Linker from '@/components/Linker'
import ImagePicker from '@/components/ImagePicker'
import defaultImg from '@/static/images/x.png'
import { uniqueId } from '@/utils'

const { Panel } = Collapse


const HeaderItem = ({ index, onDelete }) => (
  <div className="swiper-item-header">
    <div className="title">轮播项({index})</div>
    <div className="actions">
      <Icon onClick={onDelete} type="delete" />
    </div>
  </div>
)


class Swiper extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    config: {
      items: []
    }
  }

  constructor(props) {
    super(props)
    const { config: { items } } = this.props
    this.state = {
      swiperIndex: 0,
      imagePickerVisible: false,
      items
    }
  }

  // 添加轮播项
  addSwiperItem = () => {
    const key = uniqueId(6,7)
    const { items } = this.state
    const newItems = concat(items, [{ key, src: defaultImg }])
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 删除轮播
  deleteSwpierItem = (event, index) => {
    event.stopPropagation()
    const { items } = this.state
    const newItems = remove(index, 1, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 修改轮播图片
  onImageChange = (imgs) => {
    const imgObj = last(imgs)
    const { items, swiperIndex } = this.state
    const swiperItem = items[swiperIndex]
    swiperItem.src = imgObj.url
    const newItems = update(swiperIndex, swiperItem, items)
    this.setState({ imagePickerVisible: false, items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 修改轮播跳转
  updateSwiperItem = (index, url) => {
    const { items } = this.state
    const swiperItem = items[index]
    swiperItem.url = url
    const newItems = update(index, swiperItem, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
    })
  }

  // 选择图片
  openImagePicker = (swiperIndex) => {
    this.setState({ swiperIndex, imagePickerVisible: true })
  }

  // 修改轮播的 data
  onPropsChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'items', value })
  }

  render() {
    const { items, imagePickerVisible } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">图片列表</h4>
          <div className="content-data-swiper">
            <Collapse bordered={false}>
              {
                items.map((item, index) => (
                  <Panel header={<HeaderItem data-id={item.id} onDelete={(e) => { this.deleteSwpierItem(e, index) }} index={index+1} />} key={item.key}>
                    <div className="content-data-swiper-item">
                      <div className="content-data-swiper-item-panel">
                        <h4>图片</h4>
                        <div className="imager-content">
                          <img src={item.src} alt="单张图片" />
                          <div onClick={() => { this.openImagePicker(index) }} className="imager-content-mask"><Icon type="edit" /></div>
                        </div>
                      </div>
                      <div className="content-data-swiper-item-panel">
                        <h4>链接</h4>
                        <Linker url={item.url} onChange={(url) => { this.updateSwiperItem(index, url) }} />
                      </div>
                    </div>
                  </Panel>
                ))
              }
            </Collapse>
            <div className="content-data-swiper-add">
              <Button onClick={this.addSwiperItem} icon="plus-circle">添加轮播项</Button>
            </div>
          </div>
        </div>
        <ImagePicker visible={imagePickerVisible} onChange={this.onImageChange} />
      </Fragment>
    );
  }
}

export default Swiper
