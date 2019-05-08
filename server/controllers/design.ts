import { Context } from 'koa'
import { is, head, last } from 'ramda'
import { get, add, query } from '../services/design'

export default class Design {
  // 获取单个装修
  public static async getById(ctx:Context) {
    const { id } = ctx.params
    console.log(id)
    const res = await get(id)
    ctx.status = 200
    ctx.body = res
  }
  // 获取分类
  public static async queryDesign(ctx:Context) {
    const params = ctx.query
    const res = await query(params)
    let entities = { data: [], total: 0 }
    if (is(Array, res)) {
      const data = head(res)
      const total = last(res)
      entities = { data, total }
    }
    ctx.status = 200
    ctx.body = entities
  }
  // 添加分类
  public static async addDesign(ctx:Context) {
    const { body } = ctx.request
    const res = await add(body)
    ctx.status = 200
    ctx.body = res
  }
}
