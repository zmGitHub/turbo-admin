import React, { PureComponent, Fragment } from 'react'
import { InputNumber, message, Spin, Icon } from 'antd'
import { connect } from 'dva'
import { is, last } from 'ramda'
import { debounce, formatImgHttps } from '@/utils'
import defaultImg from '@/static/images/freemix-bg.png'
import ImagePicker from '@/components/ImagePicker'
import { useToggle, useSetState } from '@/stores/hook'
import TextArea from './common/textArea'

const formatImg = '?x-oss-process=image/resize,m_mfit,w_375/sharpen,100'

@connect()
class FreemixDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    this.state = {
      data,
      visible: false,
    }
  }

  onDisplyaChange = (value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key: 'display', value })
  }

  onInlineChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'inlineStyle', value })
  }

  onActivityChange = debounce((promotionId) => {
    if (is(Number, promotionId)) {
      const { config: { id }, onChange, dispatch } = this.props
      dispatch({
        type: 'component/getFreemix',
        payload: {
          promotionId,
          channel: 2,
        },
        callback: (res) => {
          if (res && res.promotion) {
            const { promotion = {}, mainItemWithSkus = {}, mixedItemsWithSkus = [] } = res
            // const { hisenseMenu, mainImage, name, articleDesc, createdAt, readTime } = res
            onChange({
              id,
              key: 'content',
              value: {
                id: promotionId,
                promotion,
                mainItemWithSkus,
                mixedItemsWithSkus,
              }
            })
            onChange({
              id,
              key: 'promotionId',
              value: promotionId,
            })
          } else {
            message.info('未找到随心配活动, 请确认活动ID是否存在')
          }
        }
      })
    }
  }, 1000)

  onTitleChange = (key, value) => {
    const { onChange, config: { id } } = this.props
    onChange({ id, key, value })
  }

  onSkuIdChange = (skuId, index) => {
    const { onChange, config: { id, data = {} } } = this.props
    const { skuIds = [] } = data || {}

    if (is(Number, skuId)) {
      skuIds[index] = skuId
      onChange({
        id,
        key: 'skuIds',
        value: skuIds,
      })
    }
  }

  onImageLoad = () => {
    // const { naturalHeight } = currentTarget
    // const { onChange, config: { id } } = this.props
    this.setState({ loading: false })
    // if(this.state.height !== naturalHeight) {
    //   onChange({ id, key: 'height', value: naturalHeight })
    // }
  }

  onImageChange = (images) => {
    // const [ toggle ] = useToggle(false)
    const { onChange, config: { id } } = this.props
    // toggle(false)
    this.setState({
      visible: false,
    })
    if(images && images.length) {
      const imgItem = last(images)
      const srcRandom = `${imgItem.url}${formatImg}&_=${+new Date()}`
      this.setState({ loading: true })
      onChange({ id, key: 'bgImage', value: formatImgHttps(srcRandom) })
    }

  }

  // const [ on, toggle ] = useToggle(false)
  // const imgSrc = src ? `${src}${formatImg}` : defaultImg
  // const [ state, setState ] = useSetState({ src: imgSrc, height, url, loading: false })
  showImageModal = () => {
    this.setState({
      visible: true,
    })
  }


  render() {
    const { data: { promotionId, mainTitle, subTitle, bgImage, skuIds = [] }, loading, visible } = this.state
    const skuId1 = skuIds.length ? skuIds[0] : null
    const skuId2 = skuIds.length > 1 ? skuIds[1] : null
    // const [ on ] = useToggle(false)
    // const [ on, toggle ] = useToggle(false)

    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">随心配活动ID</h4>
          <div className="content-data-article">
            <InputNumber
              defaultValue={promotionId}
              placeholder="请输入活动id"
              onChange={this.onActivityChange}
              maxLength={10}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">活动标题</h4>
          <div className="content-data-article">
            <TextArea value={mainTitle} onChange={(value) => this.onTitleChange('mainTitle', value )} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">副标题</h4>
          <div className="content-data-article">
            <TextArea value={subTitle} onChange={(value) => this.onTitleChange('subTitle', value )} />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">副商品skuId</h4>
          <div className="content-data-article">
            <div>
              <InputNumber
                defaultValue={skuId1}
                placeholder="请输入skuId"
                onChange={(value) => this.onSkuIdChange(value, 0)}
                maxLength={10}
              />
            </div>
            <div>
              <InputNumber
                defaultValue={skuId2}
                placeholder="请输入skuId"
                onChange={(value) => this.onSkuIdChange(value, 1)}
                maxLength={10}
              />
            </div>
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">背景图片</h4>
          <div className="content-data-imager">
            <Spin size="small" spinning={loading} tip="图片加载中...">
              <div className="imager-content">
                <img onLoad={this.onImageLoad} src={formatImgHttps(bgImage) || defaultImg} alt="单张图片" />
                <div onClick={this.showImageModal} className="imager-content-mask"><Icon type="edit" /></div>
              </div>
            </Spin>
          </div>
          <ImagePicker visible={visible} onChange={this.onImageChange} />
        </div>
      </Fragment>
    );
  }
}

export default FreemixDesign
