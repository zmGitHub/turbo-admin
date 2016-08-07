import React from 'react';
import './Icon.scss';

export const Icon = props => {
  const { type, className = '' } = props;
  return <i {...props} className={`${className} fa fa-${type}`.trim()} />;
};

Icon.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string
};

export default Icon;
