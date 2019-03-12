import React, { Fragment } from 'react'
import { InputNumber, Spin, Icon } from 'antd'
import { last } from 'ramda'
import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'

import './index.less'

const formatImg = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

const GiftDesign = ({ config, onChange }) => {
  const { id, data: { src, height, url } } = config
  const [ on, toggle ] = useToggle(false)
  const imgSrc = src ? `${src}${formatImg}` : defaultImg
  const [ state, setState ] = useSetState({ src: imgSrc, height, url, loading: false })
  const onImageChange = (images) => {
    toggle(false)
    if(images && images.length) {
      const imgItem = last(images)
      const srcRandom = `${imgItem.url}${formatImg}&_=${+new Date()}`
      setState({ src: srcRandom, loading: true })
      onChange({ id, key: 'src', value: imgItem.url })
    }

  }
  const onLinkerChange = (value) => {
    onChange({ id, key: 'url', value })
  }

  const onHeightChange = (value) => {
    if(state.height !== value) {
      setState({ height: value })
      onChange({ id, key: 'height', value })
    }
  }

  const onImageLoad = ({ currentTarget }) => {
    const { naturalHeight } = currentTarget
    if(state.height !== naturalHeight) {
      setState({ height: naturalHeight, loading: false })
      onChange({ id, key: 'height', value: naturalHeight })
    }
  }
  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">图片</h4>
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
        <h4 className="content-data-title">高度</h4>
        <div className="content-data-imager">
          <InputNumber disabled={state.loading} min={10} value={state.height} onChange={onHeightChange} />
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">链接</h4>
        <div className="content-data-linker">
          <Linker url={url} multiGoods={false} onChange={onLinkerChange} />
        </div>
      </div>
      <ImagePicker visible={on} onChange={onImageChange} />
    </Fragment>
  )
}

export default GiftDesign
