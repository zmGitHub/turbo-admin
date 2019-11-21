import { Context } from 'koa'
import { forEach, includes, filter, concat, map, join, uniq, is, find, propEq } from 'ramda'
import request from '../services/request'

const formatPrice = (price, unit = 2) => {
  if (!price) {
    return '0'
  }
  const formatedPrice = (price / 100).toFixed(unit)
  const numberPrice = parseFloat(formatedPrice)

  return `${numberPrice}`
}

// 根据 header 里面的 h-channel 过滤平台
export default async (ctx:Context) => {
  const hiChannel = ctx.header['hi-channel']
  const body = ctx.body
  // 数据过滤处理(平台列表处理, 价格数据处理)
  if (body && body.data) {
    try {
      const items = JSON.parse(body.data)
      let components = []
      if (hiChannel) {
        forEach((item) => {
          const { content: { channel } } = item
          if (channel) {
            if (includes(Number.parseInt(hiChannel, 10), channel)) {
              components.push(item)
            }
          } else {
            components.push(item)
          }
        },      items)
      } else {
        components = items
      }
      // 处理价格
      const filterFunc = ({ component }) => component === 'goodsCard' || component === 'goodsSlider'
      const goodsComponents = filter(filterFunc, components)
      if (goodsComponents.length > 0) {
        // 取出所有的商品
        let itemsId = []
        forEach(({ content }) => {
          const { data: { items } } = content
          itemsId = concat(itemsId, items)
        }, goodsComponents)
        const itemsArr = uniq(map(({ id }) => `${id}`, itemsId))
        const itemIds = join(',', itemsArr)
        const res:any = await request.get('/api/hisense/item-with-skus/batch',
        { params: { itemIds } })
        if (is(Array, res) && res.length > 0) {
          const priceArr = map(({ item: { id, lowPrice } }) => ({ lowPrice, id: `${id}` }), res)
          // 处理商品价格
          forEach(({ component, content }) => {
            if (component === 'goodsCard' || component === 'goodsSlider') {
              const { data: { items } } = content
              forEach((item) => {
                const priceItem = find(propEq('id', item.id), priceArr)
                if (priceItem && priceItem.id) {
                  item.price = formatPrice(priceItem.lowPrice)
                }
              }, items)
            }
          }, components)
        }
      }
      ctx.body = { ...body, data: JSON.stringify(components) }
    } catch (error) {
      console.log('价格处理错误:')
      console.error(error)
      ctx.body = body
    }
  } else {
    ctx.body = body
  }
}
