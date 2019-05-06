import { Context } from 'koa'

export default class Category {
  // 获取分类
  public static async getCategory(ctx:Context) {
    ctx.status = 200
    ctx.body = {
      list: [1, 3, 4, 5],
    }
  }
  // 添加分类
  public static async addCategory(ctx:Context) {
    ctx.status = 200
    ctx.body = {
      result: 'ok',
      code: 1,
    }
  }
}
