import React, { Fragment } from 'react'
import { Input, Spin, Icon } from 'antd'
import { last } from 'ramda'
import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import ColorPicker from '@/design/editor/common/color'
import defaultImg from '@/static/images/x.png'

import './index.less'

const formatImg = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

const LotteryDesign = ({ config, onChange }) => {
  const { id, data } = config
  const { src, backgroundColor, url } = data
  const [ on, toggle ] = useToggle(false)
  const imgSrc = src ? `${src}${formatImg}` : defaultImg
  const [ state, setState ] = useSetState({ src: imgSrc, backgroundColor, url, loading: false })
  const onImageChange = (images) => {
    toggle(false)
    if(images && images.length) {
      const imgItem = last(images)
      const srcRandom = `${imgItem.url}${formatImg}&_=${+new Date()}`
      setState({ src: srcRandom, loading: true })
      onChange({ id, key: 'src', value: imgItem.url })
    }
  }

  const onColorChange = ({ value }) => {
    onChange({ id, key: 'backgroundColor', value })
  }

  const onIdChange = (e) => {
    const { value } = e.target;
    onChange({ id, key: 'id', value })
  }

  const onImageLoad = ({ currentTarget }) => {
    const { naturalHeight } = currentTarget
    if(state.height !== naturalHeight) {
      setState({ height: naturalHeight, loading: false })
    }
  }
  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">大转盘ID</h4>
        <div className="content-data-imager">
          <Input type="number" defaultValue={data.id} onChange={onIdChange} />
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">背景颜色</h4>
        <div className="content-data-imager">
          <ColorPicker config={{ value: backgroundColor }} onChange={onColorChange} />
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">背景图片</h4>
        <div className="content-data-imager">
          <Spin size="small" spinning={state.loading} tip="图片加载中...">
            <div className="imager-content">
              <img onLoad={onImageLoad} src={state.src || defaultImg} alt="单张图片" />
              <div onClick={() => { toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
            </div>
          </Spin>
        </div>
      </div>
      <ImagePicker visible={on} onChange={onImageChange} />
    </Fragment>
  )
}

export default LotteryDesign
