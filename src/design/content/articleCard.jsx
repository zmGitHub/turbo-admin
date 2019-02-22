import React, { PureComponent, Fragment } from 'react'
import { InputNumber, Switch, message, Checkbox } from 'antd'
import { connect } from 'dva'
import { is } from 'ramda'
import { debounce } from '@/utils'

const { Group } = Checkbox

const plainOptions = [
  { label: '分类', value: 'type' },
  { label: '名称', value: 'name' },
  { label: '描述', value: 'desc' },
  { label: '日期', value: 'date' },
  { label: '阅读', value: 'read' },
]

@connect()
class ArticleCardDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    this.state = { data }
  }

  onDisplyaChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'display', value })
  }

  onInlineChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'inlineStyle', value })
  }

  // debounce
  onTitleChange = debounce((articleId) => {
    if (is(Number, articleId)) {
      const { config: { id }, onChange, dispatch } = this.props
      dispatch({
        type: 'component/getArticle',
        payload: articleId,
        callback: (res) => {
          if (res && res.id) {
            const { hisenseMenu, mainImage, name, articleDesc, createdAt, readTime } = res
            onChange({
              id,
              key: 'content',
              value: {
                id: articleId,
                tag: hisenseMenu.name,
                name,
                mainImage,
                articleDesc,
                createdAt,
                readTime
              }
            })
          } else {
            message.info('未找到文章, 请确认文章ID是否存在')
          }
        }
      })
    }
  }, 500)

  render() {
    const { data: { inlineStyle, display, content } } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">文章ID</h4>
          <div className="content-data-article">
            <InputNumber
              defaultValue={content.id}
              placeholder="请输入文章id"
              onChange={this.onTitleChange}
              maxLength={10}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">模式</h4>
          <div className="content-data-article">
            <div className="label">横向模式</div>
            <Switch defaultChecked={inlineStyle} onChange={this.onInlineChange} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">展示</h4>
          <div className="content-data-article">
            <Group options={plainOptions} defaultValue={display} onChange={this.onDisplyaChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ArticleCardDesign
