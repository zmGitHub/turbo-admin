import React, { PureComponent } from 'react';
import { Icon } from 'antd'
import { includes } from 'ramda'
import classnames from 'classnames'
import moment from 'moment'
import { getStyles } from '@/utils'
import defaultImg from '@/static/images/x.png'

import './index.less'

const inlineFormat = '?x-oss-process=image/resize,m_fixed,w_96,h_96/interlace,1'
const blockFormat = '?x-oss-process=image/resize,m_fixed,w_375,h_196/interlace,1'

class ArticleCard extends PureComponent {
  render() {
    const { componentStyle, data: { inlineStyle, display, content } } = this.props
    const xArticleCardStyle = classnames('x-article-card', {
      inline: inlineStyle,
    })
    const xArticleCardContentStyle = classnames('x-article-card-content', {
      hide: display.length === 0,
    })
    const imgSrc = `${( content.mainImage || defaultImg )}${ inlineStyle ? inlineFormat: blockFormat }`
    // x-article-card inline
    // x-article-card-content
    return (
      <div className={xArticleCardStyle}>
        <img className="x-article-card-img" src={imgSrc} alt="文章" />
        <div className={xArticleCardContentStyle}>
          <div className={classnames('tag', { hide: !includes('type', display) })} style={getStyles(componentStyle, ['typeFont'])}>{content.tag}</div>
          <div className={classnames('name', { hide: !includes('name', display) })} style={getStyles(componentStyle, ['titleFont'])}>{content.name}</div>
          <div className={classnames('desc', { hide: !includes('desc', display) })} style={getStyles(componentStyle, ['descTitle'])}>{content.articleDesc}</div>
          <div className='footer'>
            <div className={classnames('date', { hide: !includes('date', display) })}>{moment(content.createdAt).format('YYYY-MM-DD hh:mm')}</div>
            <div className={classnames('read', { hide: !includes('read', display) })}>
              <Icon type="eye" />
              <span>{content.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ArticleCard
