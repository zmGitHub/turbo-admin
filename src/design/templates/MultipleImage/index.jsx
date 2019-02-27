import React, { PureComponent } from 'react'
import { getStyles } from '@/utils'
import classnames from 'classnames'
import defaultImg from '@/static/images/x.png'
import './index.less'

const defalutItems = [
    {key: 'multImg_1',src: defaultImg}
]

const format = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

class MultipleImage extends PureComponent {
  render() {
    const { componentStyle, data } = this.props
    const items = data.items.length > 0 ? data.items : defalutItems
    console.log(data.items)
    const switchStyle = classnames('x-template-multipleImage',{
      switch: !data.changeSwitch
    })

    return (
      <div className={switchStyle} style={getStyles(componentStyle, ['padding','img'])}>
        {
          // eslint-disable-next-line no-return-assign
          items.map((item) => (
            <div key={item.key} className="x-template-multipleImage-item" style={{flex:items.length!==1?item.proportion:1}}>

              <img style={getStyles(componentStyle, ['img'])} src={item.src ? `${item.src}${format}` : defaultImg} alt="多张图片" draggable={false} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default MultipleImage
