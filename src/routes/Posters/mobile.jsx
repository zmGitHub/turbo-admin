import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { append } from 'ramda'
import { getPageQuery } from '@/utils'
import Crop from './Components/crop'
import TemplateMaps from './Design/index'

const format = '?x-oss-process=image/resize,m_mfit,h_667,w_375/sharpen,100'

const DynamicComponent = ({ config, onChange }) => {
  const { key, component, content, style } = config
  const componentData = TemplateMaps[component]
  return (
    <Crop key={key} data={config} componentStyle={style} content={content.data} onChange={onChange}>
      {(componentStyle, data) => React.createElement(componentData.component || 'div', {
        component,
        componentStyle,
        data,
      })}
    </Crop>
  );
}

@connect(({ loading }) => ({
  loading: loading.effects['poster/get']
}))
class Mobile extends PureComponent {

  state = {
    list: [],
    url: ''
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    const { id }  = getPageQuery(location.search)
    dispatch({
      type: 'poster/get',
      payload: id,
      callback: (list, url) => {
        if (list && list.length) {
          this.setState({ list, url })
        }
      }
    })
    window.ee.on('ADD_POSTER_DATA', this.addComponent)
    window.ee.on('POSTER_URL_UPDATE', this.updateURL)
  }

  componentWillUnmount() {
    window.ee.off('ADD_POSTER_DATA')
    window.ee.off('POSTER_URL_UPDATE')
  }

  onPositionChange = ({ id, x, y }) => {
    const { dispatch } = this.props
    const payload = {
      id,
      key: 'position',
      value: { x, y }
    }
    dispatch({
      type: 'poster/updateContent',
      payload
    })
  }

  updateURL = ({ url }) => {
    this.setState({ url: `${url}${format}` })
  }

  addComponent = (component) => {
    const { list } = this.state
    const { dispatch } = this.props
    const items = append(component, list)
    this.setState({ list: items }, () => {
      dispatch({
        type: 'poster/add',
        payload: { component }
      })
    })
  }

  render() {
    const { url, list } = this.state
    console.log('mobile render')
    return (
      <div className="editor-left" style={{ backgroundImage: `url(${url})` }}>
        {
          list.map((item) => (<DynamicComponent key={`dic_${item.key}`} config={item} onChange={this.onPositionChange} />))
        }
      </div>
    );
  }
}

export default Mobile
