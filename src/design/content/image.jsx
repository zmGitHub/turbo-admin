import React, { Fragment } from 'react'
import { Icon } from 'antd'
import { head } from 'lodash'
import { useToggle, useSetState } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import defaultImg from '@/static/images/x.png'

import './index.less'

const ImageDesign = ({ config, onChange }) => {
  const { id, src, url } = config
  const [ on, toggle ] = useToggle(false)
  const [ state, setState ] = useSetState({ src, url })
  const onImageChange = (images) => {
    const imgItem = head(images)
    toggle(false)
    setState({ src: imgItem.url })
    onChange({ id, key: 'src', value: imgItem.url })
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
      <ImagePicker visible={on} onChange={onImageChange} />
    </Fragment>
  )
}

export default ImageDesign
