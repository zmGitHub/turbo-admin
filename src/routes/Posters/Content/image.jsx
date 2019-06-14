import React, { Fragment } from 'react'
import { Select, Popover, Icon, InputNumber, Spin } from 'antd'
import { last } from 'ramda'
import { useSetState, useToggle } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import defaultImg from '@/static/images/x.png'

const { Option } = Select

const RuleInfo = (
  <div className="poster-rule">
    <div className="poster-rule-item">标题文字在分享时可以动态替换指定内容, 规则如下:</div>
    <div className="poster-rule-item">在标题中输入$template作为占位符来动态注入数据, 填写$template前请务必选择类型</div>
  </div>
);

const TipInfo = ({ title }) => (
  <Popover content={RuleInfo} title="规则描述">
    {title}&nbsp;<Icon type="question-circle-o" />
  </Popover>
)

const ImageDesign = ({ config, onChange }) => {
  const { data: { url, enums, width, height } } = config
  const imgSrc = url || defaultImg

  const [ state, setState ] = useSetState({ src: imgSrc, loading: false })
  const [ on, toggle ] = useToggle(false)

  const onEnumsChange = (value) => {
    onChange({ key: 'enums', value })
  }

  const onImageChange = (images) => {
    toggle(false)
    if(images && images.length) {
      const imgItem = last(images)
      const srcRandom = `${imgItem.url}?_=${+new Date()}`
      setState({ src: srcRandom, loading: true })
      onChange({ key: 'url', value: imgItem.url })
    }
  }

  const onImageLoad = () => {
    setState({ loading: false })
  }

  const onWidthChange = (value) => {
    onChange({ key: 'width', value })
  }

  const onHeightChange = (value) => {
    onChange({ key: 'height', value })
  }

  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">类型</h4>
        <div className="content-data-linker">
          <Select style={{ width: '100%' }} defaultValue={enums} onChange={onEnumsChange}>
            <Option value="">无</Option>
            <Option value="avatar">用户头像</Option>
            <Option value="item">商品主图</Option>
            <Option value="code">小程序码</Option>
          </Select>
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title"><TipInfo title="图片" /></h4>
        <div className="content-data-imager">
          <Spin size="small" spinning={state.loading} tip="图片加载中...">
            <div className="imager-content">
              <img onLoad={onImageLoad} src={state.src || defaultImg} alt="单张图片" />
              <div onClick={() => { toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </Spin>
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">图片宽度</h4>
        <div className="content-data-linker">
          <InputNumber min={10} max={375} defaultValue={width} onChange={onWidthChange} />
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">图片高度</h4>
        <div className="content-data-linker">
          <InputNumber min={10} max={667} defaultValue={height} onChange={onHeightChange} />
        </div>
      </div>
      <ImagePicker visible={on} onChange={onImageChange} />
    </Fragment>
  )
}

export default ImageDesign
