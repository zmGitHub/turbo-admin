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

const defaultList = [{
  id: 'test_1', // 文章 id,
  tag: '购物指南',
  mainImage: '',
  name: '产品参数查询',
  articleDesc: '产品参数查询',
  createdAt: +new Date(),
  readTime: 789
}]

class MessageList extends PureComponent {
  render() {
    const { componentStyle, data: { inlineStyle, display, types, list } } = this.props
    const xArticleCardStyle = classnames('x-message-card', {
      inline: inlineStyle,
    })
    const xArticleCardContentStyle = classnames('x-message-card-content', {
      hide: display.length === 0,
    })

    const messageList = list.length > 0 ? list : defaultList

    return (
      <div className="x-message" style={getStyles(componentStyle, ['margin'])}>
        <div className="x-message-header">
          {
            types.map(({ menuId, menuName, active }, index) => (
              <div key={`${menuId}_menu_${index}`} className={classnames('x-message-header-item', { active })}>{menuName}</div>
            ))
          }
        </div>
        <div className="x-message-content">
          {
            messageList.map((content, index) => (
              <div key={`${content.id}_message_${index}`} className={xArticleCardStyle}>
                <img className="x-message-card-img" src={`${( content.mainImage || defaultImg )}${ inlineStyle ? inlineFormat: blockFormat }`} alt="文章" />
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
            ))
          }

        </div>
      </div>
    );
  }
}


export default MessageList
