import { Context } from 'koa'
import { CronJob } from 'cron'
import { is, head, last, map } from 'ramda'
import {
  get, add, query, update, remove, getPublish,
  resetPublish, QueryParams, AddParams,
} from '../services/poster'
import { PosterStatus } from '../models/poster'

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

  // 发布模板 定时发布 和 立即发布
  public static async publishPoster(ctx: Context) {
    const { body } = ctx.request
    const { id, timer, type, shopId } = body
    ctx.status = 200
    try {
      if (!timer) {
        const resetRes = await resetPublish(type, shopId)
        if (resetRes) {
          const res = await update({ id, status: PosterStatus.PUBLISH })
          ctx.body = { code: 200, msg: '发布成功', data: res }
        } else {
          ctx.body = { code: 200, msg: '发布失败' }
        }
      } else {
        const res = await update({ id, timer, status: PosterStatus.TIMER })
        if (res) {
          const timeToTimer = new Date(timer)
          const reservationJob = new CronJob(timeToTimer, () => {
            resetPublish(type, shopId)
            console.log(`开始发布海报: ${id}-${type}`)
            update({ id, status: PosterStatus.PUBLISH })
          })
          reservationJob.start()
        }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: '发布失败', error: error.message }
    }

  }
  // 删除
  public static async delete(ctx: Context) {
    const { id } = ctx.params
    const res = await remove(id)
    ctx.status = 200
    ctx.body = res
  }

  // 获取发布商城的 poster
  public static async getShopPublish(ctx: Context) {
    const { type } = ctx.query
    const res = await getPublish({ type, shopId: 1 })
    let data = null
    ctx.status = 200
    if (res && res.id) {
      const { id, name, cover, setting } = res
      data = { id, name, cover, setting }
    }
    ctx.body = data
  }

  // 获取发布o2o的 poster
  public static async getO2oPublish(ctx: Context) {
    const { type } = ctx.query
    const res = await getPublish({ type, shopId: -1 })
    let data = null
    ctx.status = 200
    if (res && res.id) {
      const { id, name, setting } = res
      data = { id, name, setting }
    }
    ctx.body = data
  }
}
