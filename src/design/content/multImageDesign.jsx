import React, { Fragment, PureComponent } from 'react'
import { Switch, Icon, Button, Collapse, Slider, Progress} from 'antd'
import { concat, update, remove, last, pluck, reduce } from 'ramda'
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
      items: data.items,
      proportionBase: data.proportionBase
    }
  }

  // 求和前置函数
  sumPre = (num1, num2) =>  num1 + num2
  // 除法前置函数

  divisionPre = (num) => {
    const { proportionBase } = this.state
    const returnNum = num/proportionBase*100
    return Number(returnNum.toFixed(1))
  }

  // 获取所有条目,并且重新给所有条目赋值
  proportionCount = (items) => {
    const allProportion =  pluck("proportion")(items)
    const result = reduce(this.sumPre, 0)(allProportion)

    const { config: { id }, onChange } = this.props

    this.setState({ proportionBase:result }, () => {
      onChange({ id, key: 'proportionBase', value: result })
    })
  }

  // 添加图片
  addMultImageItem = () => {
    const key = uniqueId(6,7)
    const { items } = this.state
    const proportionDefault = 50
    const newItems = concat(items, [{ key, src: defaultImg, proportion: proportionDefault }])
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
      this.proportionCount(newItems)
    })

  }
  // 改变行列 TODO:  改的标准  装入status中

  onSwitchChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'changeSwitch', value })
  }


  // 删除图片
  deleteMultImageItem = (event, index) => {
    event.stopPropagation()
    const { items } = this.state
    const newItems = remove(index, 1, items)
    this.setState({ items: newItems }, () => {
      this.onPropsChange(newItems)
      this.proportionCount(newItems)
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

  onAfterChange = (index,value) => {
    const { items } = this.state
    const multImageItem = items[index]
    multImageItem.proportion = value
    const newItems = update(index, multImageItem, items)
    this.setState({items: newItems },()=>{
      this.onPropsChange(newItems)
      this.proportionCount(newItems)
    })
  }


  render() {
    const { items, imagePickerVisible,proportionBase } = this.state
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
                        <Slider className="Proportion" defaultValue={50} marks={{0:"0",25:"25",50:"50",75:"75",100:"100"}} onChange={(value)=>{this.onAfterChange(index,value)}}  />
                        <div className="item-Progress">
                          <Progress type="circle" percent={Number((item.proportion/proportionBase*100).toFixed(1))} width={40} strokeColor="#ff835a" status="normal" />
                        </div>
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
