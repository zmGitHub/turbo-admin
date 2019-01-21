import React, { Fragment } from 'react'
import { Icon } from 'antd'
import { useToggle } from '@/stores/hook'
import ImagePicker from '@/components/ImagePicker'
import defaultImg from '@/static/images/x.png'

import './index.less'

const ImageDesign = () => {
  const [ on, toggle ] = useToggle(false)
  const onImageChange = () => {

  }
  console.log('图片装修');
  console.log(on);
  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">图片</h4>
        <div className="content-data-imager">
          <div className="imager-content">
            <img src={defaultImg} alt="单张图片" />
            <div onClick={() => { toggle(true) }} className="imager-content-mask"><Icon type="edit" /></div>
          </div>
        </div>
      </div>
      <ImagePicker visible={on} />
    </Fragment>
  )
}

export default ImageDesign
