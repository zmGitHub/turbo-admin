import React, { Fragment } from 'react'
import { InputNumber, Spin, Icon } from 'antd'
import { last } from 'ramda'
import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'

import './index.less'

const formatImg = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

const BallDesign = ({ config, onChange }) => {
  const { id, data: { image, leftImage, rightImage, height, url } } = config
  const [on, toggle] = useToggle(false)
  const imageSrc = image ? `${image}${formatImg}` : defaultImg
  const leftImageSrc = leftImage ? `${leftImage}${formatImg}` : defaultImg
  const rightImageSrc = rightImage ? `${rightImage}${formatImg}` : defaultImg
  const [state, setState] = useSetState({ imageSrc, leftImageSrc, rightImageSrc, height, url, loading: false })
  const onImageChange = (images) => {
    toggle(false)
    if (images && images.length) {
      const imgItem = last(images)
      const srcRandom = `${imgItem.url}${formatImg}&_=${+new Date()}`
      setState({ [state.key]: imgItem.url, [`${state.key}Src`]: srcRandom, loading: true })
      onChange({ id, key: state.key, value: imgItem.url })
    }

  }
  const onLinkerChange = (value) => {
    onChange({ id, key: 'url', value })
  }

  const onImageLoad = ({ currentTarget }) => {
    setState({ loading: false })
  }
  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">默认图</h4>
        <div className="content-data-imager">
          <Spin size="small" spinning={state.loading} tip="图片加载中...">
            <div className="imager-content">
              <img onLoad={onImageLoad} src={state.imageSrc || defaultImg} alt="默认图" />
              <div onClick={() => { setState({ key: 'image' }); toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </Spin>
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">左侧图</h4>
        <div className="content-data-imager">
          <Spin size="small" spinning={state.loading} tip="图片加载中...">
            <div className="imager-content">
              <img onLoad={onImageLoad} src={state.leftImageSrc || defaultImg} alt="左侧图" />
              <div onClick={() => { setState({ key: 'leftImage' }); toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </Spin>
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">右侧图</h4>
        <div className="content-data-imager">
          <Spin size="small" spinning={state.loading} tip="图片加载中...">
            <div className="imager-content">
              <img onLoad={onImageLoad} src={state.rightImageSrc || defaultImg} alt="右侧图" />
              <div onClick={() => { setState({ key: 'rightImage' }); toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </Spin>
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

export default BallDesign
