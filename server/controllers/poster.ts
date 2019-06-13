import { Context } from 'koa'
import { is, head, last, map } from 'ramda'
import { get, add, query, update, QueryParams, AddParams } from '../services/poster'

export default class Poster {

  // 添加模板
  public static async getPoser(ctx:Context) {
    const { id } = ctx.params
    const res = await get(id)
    ctx.status = 200
    if (res && res.id) {
      const { id, data, setting } = res
      ctx.body = { id, data, setting }
    } else {
      ctx.body = ''
    }
  }

  public static async getPosterList(ctx: Context) {
    const params:QueryParams  = ctx.query
    const res = await query(params)
    let entities = { data: [], total: 0 }
    if (is(Array, res)) {
      const data = map(
        ({
          data, ...rest
        }) => ({ canPublish: !!data, ...rest }),
        head(res))
      const total = last(res)
      entities = { data, total }
    }
    ctx.status = 200
    ctx.body = entities
  }

  // 修改模板信息
  public static async updatePoster(ctx:Context) {
    const { body } = ctx.request
    const res = await update(body)
    if (res && res.raw && res.raw.affectedRows) {
      ctx.status = 200
      ctx.body = res
    } else {
      ctx.status = 500
      ctx.body = { msg: '更新失败' }
    }
  }
  // 添加模板
  public static async addPoster(ctx:Context) {
    const { body } = ctx.request
    const res:AddParams = await add(body)
    ctx.status = 200
    ctx.body = res
  }
}
