import React from 'react'
import Protypes from 'prop-types'
import { Icon } from 'antd'

export const DeleteIcon = props => (
  <div
    className="x-crop-item-icon"
    {...props}
  >
    <Icon type="delete" />
  </div>

)

export const NumberIcon = ({ number }) => (
  <div className="x-crop-item-number">
    { number }
  </div>
)

const { number } = Protypes

NumberIcon.propTypes = {
  number,
}

NumberIcon.defaultProps = {
  number: '',
}

