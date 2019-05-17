import { Context } from 'koa'
import { getAuth, updateAuth } from '../services/auth'

export default class Setting {
  static async getComponentAuth(ctx: Context) {
    const res = await getAuth()
    ctx.status = 200
    ctx.body = res
  }
  static async updateComponentAuth(ctx: Context) {
    const { body } = ctx.request
    const res = await updateAuth(body)
    ctx.status = 200
    ctx.body = res
  }
}
