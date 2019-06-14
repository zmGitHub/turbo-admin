import React, { PureComponent, lazy, Suspense } from 'react'
import { connect } from 'dva'
import { last } from 'ramda'
import { Button, Tooltip, Icon, message, Popover, Radio } from 'antd'
import ImagePicker from '@/components/ImagePicker'
import { uniqueId, formatImgHttps, getPageQuery } from '@/utils'
import EditorMaps from '@/design/editor'
import ContentMaps from './Content'
import TemplateMaps from './Design'

const DynamicComponent = ({ onChange, config, maps }) => {
  const { component } = config
  const LoadComponent = maps[component] || maps.error
  const LazyComponent = lazy(() => LoadComponent)
  return (
    <LazyComponent config={config} onChange={onChange} />
  )
}

@connect()
class Setting extends PureComponent {

  state = {
    data: {
      elVisible: false,
      content: {},
      style: []
    },
    imagePickerVisible: false,

  }

  componentDidMount() {
    // 监听数据变化
    window.ee.on('GET_POSTER_DATA', this.setPosterData)
  }

  handleVisibleChange = () => {
    const { elVisible } = this.state
    this.setState({ elVisible: !elVisible })
  }

  setPosterData = (component) => {
    const { data } = this.state
    if (component && data.key !== component.key) {
      console.log('渲染组件')
      this.setState({ data: component })
    }
  }

  onTypeChange = ({ target }) => {
    const type = target.value
    const key = uniqueId(7,9)
    console.log(type)
    const { config } = TemplateMaps[type]
    const data = config()
    // 添加组件到列表 可以覆盖默认配置
    const component = { key, ...data }
    window.ee.emit('ADD_POSTER_DATA', component)
  }

  updateComponentData = ({ key, value }) => {
    console.log('更新 content');
    const { data } = this.state
    const { dispatch } = this.props
    const payload = {
      id: data.key,
      key,
      value
    }
    window.ee.emit('POSTER_CONFIG_UPDATE',
      {
        type: 'content',
        data: payload
    })
    dispatch({
      type: 'poster/updateContent',
      payload
    })
  }

  updateComponentStyle = ({ key, value }) => {
    console.log('更新 style');
    const { data } = this.state
    const { dispatch } = this.props
    const payload = {
      id: data.key,
      key,
      value
    }
    window.ee.emit('POSTER_CONFIG_UPDATE',
    {
      type: 'style',
      data: payload
    })
    dispatch({
      type: 'poster/updateStyle',
      payload
    })
  }

  onImageChange = (images) => {
    if (images && images.length) {
      const { dispatch } = this.props
      const { url } = last(images)
      const imgSrc = formatImgHttps(url)
      const { data } = this.state
      const payload = {
        id: data.key,
        url: imgSrc
      }
      window.ee.emit('POSTER_URL_UPDATE', payload)
      dispatch({
        type: 'poster/updateBackground',
        payload
      })
      this.setState({ imagePickerVisible: false  })
    } else {
      this.setState({ imagePickerVisible: false})
    }
  }

  showImagePicker = () => {
    this.setState({ imagePickerVisible: true })
  }

  onSave = () => {
    const { dispatch, location } = this.props
    const { id } = getPageQuery(location.search)
    dispatch({
      type: 'poster/submit',
      payload: { id },
      callback: (res) => {
        if (res.code === 200) {
          message.success(res.msg)
        } else {
          message.warning(res.msg)
        }
      }
    })
  }

  render() {
    const { elVisible, imagePickerVisible, data: { content, style } } = this.state
    console.log('setting render');
    return (
      <div className="editor-right">
        <div className="editor-right-action">
          <div className="editor-right-action-header">
            <div className="editor-right-action-header-left">
              <Tooltip title="请上传750*1334大小不超过100KB的图片">
                <span>海报背景</span>&nbsp;<Icon type="question-circle-o" />
              </Tooltip>
            </div>
            <div className="editor-right-action-header-right">
              <Button onClick={this.showImagePicker} type="primary" shape="circle" icon="edit" />
            </div>
          </div>
          <div className="editor-right-action-header">
            <div className="editor-right-action-header-left">海报元素</div>
            <div className="editor-right-action-header-right">
              <Popover
                content={
                  <Radio.Group onChange={this.onTypeChange}>
                    <Radio value="text">文字</Radio>
                    <Radio value="image">图片</Radio>
                  </Radio.Group>
                }
                placement="left"
                title="组件类别"
                trigger="click"
                visible={elVisible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Button type="primary" shape="circle" icon="plus" />
              </Popover>
            </div>
          </div>
          <div className="editor-right-action-content">
            <Suspense fallback={<div>Loading...</div>}>
              {
                content.component && (
                  <DynamicComponent
                    maps={ContentMaps}
                    config={content}
                    onChange={this.updateComponentData}
                  />
                )
              }
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              {
                style.map((item) => (
                  <DynamicComponent
                    key={`editor_${item.key}`}
                    maps={EditorMaps}
                    config={{ styleId: item.key, ...item }}
                    onChange={this.updateComponentStyle}
                  />
                ))
              }
            </Suspense>
          </div>
        </div>
        <div className="editor-right-footer">
          <Button type="link">返回</Button>
          <Button onClick={this.onSave} type="primary">保存</Button>
        </div>
        <ImagePicker visible={imagePickerVisible} onChange={this.onImageChange} />
      </div>
    );
  }
}

export default Setting
