import React, { Fragment } from 'react'
import { Switch } from 'antd'
import TextArea from './common/textArea'
import Linker from '@/components/Linker'

const TitleDesign = ({ config, onChange }) => {
  const { id, data: { title, moreSwitch,url } } = config

  const onTitleChange = (value) => {
    onChange({ id, key: 'title', value })
  }

  const onSwitchChange = (value) => {
    onChange({ id, key: 'moreSwitch', value })
  }

  const onLinkerChange = (value) => {
    console.log(value)
    onChange({ id, key: 'url', value })
  }

  return (
    <Fragment>
      <TextArea title="标题" value={title} onChange={onTitleChange} />
      <div className="content-data">
        <h4 className="content-data-title">更多</h4>
        <div className="content-data-caption">
          <div className="label">显示更多</div>
          <Switch defaultChecked={moreSwitch} onChange={onSwitchChange} />
        </div>
      </div>
      <div className="content-data">
        <h4 className="content-data-title">链接</h4>
        <div className="content-data-linker">
          <Linker url={url} multiGoods={false} onChange={onLinkerChange} />
        </div>
      </div>
    </Fragment>
  )
}

export default TitleDesign
