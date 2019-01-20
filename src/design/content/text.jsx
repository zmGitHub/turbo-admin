import React, { Fragment } from 'react'

import TextArea from './common/textArea'

const TextDesign = ({ config, onChange }) => {
  const { id, title } = config
  const onTitleChange = (value) => {
    onChange({ id, key: 'title', value })
  }
  return (
    <Fragment>
      <TextArea title="标题" value={title} onChange={onTitleChange} />
    </Fragment>
  )
}

export default TextDesign
