import React, { PureComponent } from 'react';
import { getStyles, formatPrice, formatImgHttps } from '@/utils'
import defaultImg from '@/static/images/freemix-bg.png'
import checkedImg from '@/static/images/checked.png'
import './index.less'

const blockFormat = '?x-oss-process=image/resize,m_fixed,w_375,h_196/interlace,1'

class Freemix extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      selected: JSON.parse(JSON.stringify(props.data.skuIds || [])),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data = {} } = nextProps
    const { skuIds } = data || {}
    this.setState({
      selected: JSON.parse(JSON.stringify(skuIds || [])),
    })
  }

  getFreemixType = (skuIds, mixedItemsWithSkus) => {
    let tag = 0
    skuIds.forEach((skuId) => {
      mixedItemsWithSkus.forEach(({ skus }) => {
        skus.forEach(({ sku: { id } }) => {
          if (skuId === id) {
            tag += 1
          }
        })
      })
    })
    if (tag === 0) {
      tag = 3
    }
    return tag
  }

  handleClick = (sku) => {
    const { selected } = this.state
    if (selected.includes(sku)) {
      selected.splice(selected.indexOf(sku) ,1)
    } else {
      selected.push(sku)
    }
    const replaceArr = JSON.parse(JSON.stringify(selected))
    this.setState({
      selected: replaceArr,
    })
  }

  renderItemList = () => {
    const { data = {} } = this.props
    const { selected } = this.state
    const { skuIds = [], content = {}, bgImage } = data || {}
    const { mainItemWithSkus, mixedItemsWithSkus = [] } = content || {}
    // 首先判断是一主一从(tag:1)、一主两从(tag: 2)还是一主多从(tag: 3)
    const tag = this.getFreemixType(skuIds, mixedItemsWithSkus)
    const skus = []

    // 先将主商品放入数组第一位
    skus.push({
      sku: {
        ...mainItemWithSkus.skus[0].sku,
        mainImage: mainItemWithSkus.item.mainImage,
      },
      freeMixInfo: mainItemWithSkus.skus[0].freeMixInfo,
      checked: true,
    })
    mixedItemsWithSkus.forEach((mixedItemsWithSku) => {
      mixedItemsWithSku.skus.forEach(({ freeMixInfo, sku }) => {
        skus.push({
          sku: {
            ...sku,
            mainImage: sku.image || mixedItemsWithSku.item.mainImage,
          },
          freeMixInfo,
          checked: selected.indexOf(sku.id) !== -1,
        })
      })
    })

    return (
      <div>
        <img className="bg-img" src={formatImgHttps(bgImage) || defaultImg} alt='背景图' />
        <div className="item-list">
          <div className={`container container-${tag}`}>
            {skus.map(({ sku, freeMixInfo, checked }, index) => {
              if (tag !== 3 && !checked) {
                return null
              }
              return (
                <div className={`item-card item-card-${tag} item-card-${tag}-${index}`} key={`list-${index}`}>
                  {index === 0 && tag === 3 ?
                    <div className="required-tag">必选</div>
                    : null
                  }
                  <img className={index === 0 && tag === 3 ? 'required' : ''} src={formatImgHttps(sku.mainImage, blockFormat)} alt='商品主图' />
                  {checked ?
                    <div className={`checkbox checkbox-${tag}-${index}`} data-sku={sku} onClick={() => this.handleClick(sku.id)}><img src={checkedImg} alt='选中' /></div>
                    : <div className="checkbox" data-sku={sku} onClick={() => this.handleClick(sku.id)} />
                  }
                  <div className="item-name">{sku.name}</div>
                  <div className="price-wrapa">
                    <span className="actual-price">¥{formatPrice(freeMixInfo.price)}</span>
                    <span className="disabled-price">¥{formatPrice(sku.price)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { componentStyle, data } = this.props
    const { selected } = this.state
    const { mainTitle, subTitle, content = {} } = data || {}
    const { promotion, mainItemWithSkus, mixedItemsWithSkus } = content || {}
    let totalFreemixPrice = 0
    let totalGoodsPrice = 0
    let skuIds = null
    let itemId = null
    if (promotion) {
      itemId = mainItemWithSkus.item.id
      totalFreemixPrice += mainItemWithSkus.skus[0].freeMixInfo.price
      totalGoodsPrice += mainItemWithSkus.skus[0].sku.price
      mixedItemsWithSkus.forEach((mixedItemsWithSku) => {
        mixedItemsWithSku.skus.forEach(({ freeMixInfo, sku }) => {
          if (selected.includes(sku.id)) {
            skuIds += `${sku.id},`
            totalGoodsPrice += sku.price * freeMixInfo.quantity
            totalFreemixPrice += freeMixInfo.price * freeMixInfo.quantity
          }
        })
      })
    }
    if (skuIds) {
      skuIds = skuIds.substr(0, skuIds.length - 1)
    }

    return (
      <div className='x-template-text' style={getStyles(componentStyle, ['title', 'margin'])}>
        { promotion ?
          this.renderItemList()
          :
          <img className="x-article-card-img" src={defaultImg} alt="随心配" />
        }
        <div className="bottom">
          <div className="left">
            <div className="main-title"><span>{mainTitle}</span></div>
            <div className="sub-title"><span>{subTitle}</span></div>
          </div>
          <div className="right">
            <div className="price-wrap"><span className="label">套购价</span><span className="actural-price">¥{formatPrice(totalFreemixPrice)}</span><span className="disable-price">{formatPrice(totalGoodsPrice)}</span></div>
            <a className="btn" href={`/goods/freemix?quantity=1&itemId=${itemId}&addressId=&skuIds=${skuIds}`}>立即购买</a>
          </div>
        </div>
      </div>
    );
  }
}


export default Freemix
