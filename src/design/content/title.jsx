import React, { Fragment } from 'react'
import { Switch } from 'antd'
import TextArea from './common/textArea'

const TitleDesign = ({ config, onChange }) => {
  const { id, data: { title,moreSwitch } } = config

  const onTitleChange = (value) => {
    onChange({ id, key: 'title', value })
  }

  const onSwitchChange = (value) => {
    console.log(value)

    onChange({ id, key: 'moreSwitch', value })
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
    </Fragment>
  )
}

export default TitleDesign
