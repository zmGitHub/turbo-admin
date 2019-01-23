import React, { Fragment } from 'react'
import { Icon } from 'antd'
import { last } from 'lodash'
import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import Linker from '@/components/Linker'
import defaultImg from '@/static/images/x.png'

import './index.less'

const ImageDesign = ({ config, onChange }) => {
  const { id, src, url } = config
  const [ on, toggle ] = useToggle(false)
  const [ state, setState ] = useSetState({ src, url })
  const onImageChange = (images) => {
    const imgItem = last(images)
    toggle(false)
    setState({ src: imgItem.url })
    onChange({ id, key: 'src', value: imgItem.url })
  }
  const onLinkerChange = (value) => {
    onChange({ id, key: 'url', value })
  }
  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">图片</h4>
        <div className="content-data-imager">
          <div className="imager-content">
            <img src={state.src || defaultImg} alt="单张图片" />
            <div onClick={() => { toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
          </div>
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

export default ImageDesign
