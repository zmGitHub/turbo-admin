import { Context } from 'koa'
import { is, head, last, find, propEq } from 'ramda'
import { get, add, query, getTiming, getHome, getHistory } from '../services/design'

export default class Design {
  // 获取单个装修
  public static async getById(ctx:Context) {
    const { id } = ctx.params
    const res = await get(id)
    ctx.status = 200
    ctx.body = res
  }
  // 获取发布中的数据
  public static async getTiming(ctx:Context) {
    const res = await getTiming()
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
  // 根据商家 id 查询正在使用的店铺模板
  public static async getHome(ctx: Context) {
    const { id } = ctx.params
    const res = await getHome(id)
    ctx.status = 200
    ctx.body = res
  }
  // 获取首页模板
  public static async getO2o(ctx: Context) {
    const { shopId } = ctx.query
    try {
      let body = ''
      const res = await getHome(shopId)
      if (res && is(Array, res) && res.length) {
        body = find(propEq('shopId', shopId), res) || last(res)
      }
      ctx.status = 200
      ctx.body = body
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: error.message }
    }
  }
  // 获取商家历史模板数据
  public static async getHistory(ctx: Context) {
    const { shopId } = ctx.query
    const res = await getHistory(shopId)
    ctx.status = 200
    ctx.body = res
  }
}
