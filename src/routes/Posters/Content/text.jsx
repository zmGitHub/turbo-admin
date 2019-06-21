import React, { Fragment } from 'react'
import { Select, Popover, Icon, Switch, InputNumber } from 'antd'
import classnames from 'classnames'
import TextArea from '@/design/content/common/textArea'
import { useSetState } from '@/stores/hook'

const { Option } = Select

const RuleInfo = (
  <div className="poster-rule">
    <div className="poster-rule-item">标题文字在分享时可以动态替换指定内容, 规则如下:</div>
    <div className="poster-rule-item">在标题中输入$template作为占位符来动态注入数据, 填写$template前请务必选择类型</div>
  </div>
);

const TipInfo = ({ title }) => (
  <Popover content={RuleInfo} title="规则描述">
    {title}&nbsp;<Icon type="question-circle-o" />
  </Popover>
)

const TextDesign = ({ config, onChange }) => {
  const { data: { content, enums, breakWord, width, MaxLineNumber } } = config
  const [ state, setState ] = useSetState({ value: breakWord })

  const onEnumsChange = (value) => {
    onChange({ key: 'enums', value })
  }

  const onTitleChange = (value) => {
    onChange({ key: 'content', value })
  }
  const onSwitchChange = (value) => {
    setState({ value })
    onChange({ key: 'breakWord', value })
  }

  const onWidthChange = (value) => {
    onChange({ key: 'width', value })
  }

  const onLineChange = (value) => {
    onChange({ key: 'MaxLineNumber', value })
  }

  const visibleStyle = classnames('content-data', { hidden: !state.value })

  return (
    <Fragment>
      <div className="content-data">
        <h4 className="content-data-title">类型</h4>
        <div className="content-data-linker">
          <Select style={{ width: '100%' }} defaultValue={enums} onChange={onEnumsChange}>
            <Option value="">无</Option>
            <Option value="name">用户名称</Option>
            <Option value="price">商品价格</Option>
            <Option value="item">商品名称</Option>
            <Option value="tel">商家号码</Option>
            <Option value="outerId">商家编码</Option>
            <Option value="address">商家地址</Option>
          </Select>
        </div>
      </div>
      <TextArea placeholder="请输入标题" title={<TipInfo title="标题" />} value={content} onChange={onTitleChange} />
      <div className="content-data">
        <h4 className="content-data-title">是否换行</h4>
        <div className="content-data-linker">
          <Switch defaultChecked={state.value} onChange={onSwitchChange} />
        </div>
      </div>
      <div className={visibleStyle}>
        <h4 className="content-data-title">文本宽度</h4>
        <div className="content-data-linker">
          <InputNumber min={10} max={375} defaultValue={width} onChange={onWidthChange} />
        </div>
      </div>
      <div className={visibleStyle}>
        <h4 className="content-data-title">换行行数</h4>
        <div className="content-data-linker">
          <InputNumber min={1} max={10} defaultValue={MaxLineNumber} onChange={onLineChange} />
        </div>
      </div>
    </Fragment>
  )
}

export default TextDesign
