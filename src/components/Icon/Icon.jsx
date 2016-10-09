import React from 'react';
import './Icon.scss';

export const Icon = props => {
  const { type, className = '', ...rest} = props;
  return <i {...rest} className={`${className} fa fa-${type}`.trim()} />;
};

Icon.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string
};

export default Icon;
