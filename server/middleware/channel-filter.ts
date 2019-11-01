import { Context } from 'koa'
import { forEach, includes } from 'ramda'

// 根据 header 里面的 h-channel 过滤平台
export default async (ctx: Context) => {
  const hiChannel = ctx.header['hi-channel']
  const body = ctx.body
  // 数据过滤处理(平台列表处理, 价格数据处理)
  if (body && body.data && (body.data instanceof Array)) {
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
        }, items)
      } else {
        components = items
      }
      // 处理价格
      ctx.body = { ...body, data: JSON.stringify(components) }
    } catch (error) {
      ctx.body = body
    }
  } else {
    ctx.body = body
  }
}
