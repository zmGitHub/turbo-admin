import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import classNames from 'classnames';
import './Button.scss';

export const Download = props => {
  const { url, paramas, icon, name, ...rest } = props;
  const paramasStr = Object.keys(paramas).map((key) => {
    if (!paramas[key]) {
      delete paramas[key];
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(paramas[key])}`;
  }).join('&');
  const exportURL = `${url}?${paramasStr}`;

  const buttonClass = classNames('btn', props.className);
  return (
    <a {...rest} className={buttonClass} href={exportURL} download={exportURL}>
      <Icon type={icon} />
      {name}
    </a>
  );
};

Download.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  paramas: PropTypes.object,
  name: PropTypes.string,
  icon: PropTypes.string
};

Download.defaultProps = {
  name: '导 出',
  icon: 'download',
  paramas: {}
};

export default Download;
