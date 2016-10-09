import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Note.scss';

const TYPES = {
  success: 'note-success',
  info: 'note-info',
  warning: 'note-warning',
  danger: 'note-danger'
};

const Note = (props) => {
  const { title, type, className, children, ...rest } = props;
  const noteClass = classnames('note', TYPES[type], className);
  return (
    <div {...rest} className={noteClass}>
      {title ? <h4 className="block">{title}</h4> : ''}
      {children}
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOfType(['success', 'info', 'warning', 'danger']),
  className: PropTypes.string,
  children: PropTypes.any
};

export default Note;
