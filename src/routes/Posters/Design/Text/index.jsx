import React, { PureComponent } from 'react';
import classnames from 'classnames'
import './index.less'


const getStyles = (styles = []) => {
  const inlineStyles = {}
  if (Array.isArray(styles)) {
    if (styles && Array.isArray(styles)) {
      styles.forEach((item) => {
        const { key, value } = item
        inlineStyles[key] = value
        if (key === 'bolder' && value) {
          inlineStyles['fontWeight'] = 'bold'
        }
      })
    }
  }
  return inlineStyles
}

class Text extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    const styles = getStyles(componentStyle)
    if (data.breakWord) {
      styles.width = data.width
      styles.WebkitLineClamp = data.MaxLineNumber
    }
    const postersClass = classnames('x-poster-text', { 'ellipsis': data.breakWord })
    return (
      <div className={postersClass} style={styles}>{data.content}</div>
    );
  }
}


export default Text
