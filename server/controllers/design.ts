import { Context } from 'koa'
import { CronJob } from 'cron'
import { is, head, last, find, propEq, map, isEmpty } from 'ramda'
import { DesignStatus, DesignType } from '../models/design'
import {
  get, add, update, query,
  getPublish, getTiming, getHome,
  getShopHistory, getShopPublish, publishHome, publishForce,
  publish, timing, UpdateParams,
} from '../services/design'

import { addRefuse, getRefuse } from '../services/refuse'

export default class Design {
  // 获取单个装修
  public static async getById(ctx:Context) {
    const { id } = ctx.params
    const res = await get(id)
    ctx.status = 200
    if (res && res.id) {
      const { id, data } = res
      ctx.body = { id, data }
    } else {
      ctx.body = ''
    }
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
      const data = map(
        ({
          data, ...rest
        }) => ({ canPublish: !isEmpty(data), ...rest }),
        head(res))
      const total = last(res)
      entities = { data, total }
    }
    ctx.status = 200
    ctx.body = entities
  }
  // 添加模板
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

  // 发布装修数据
  public static async publish(ctx: Context) {
    const { body } = ctx.request
    const { id, publishType, type, timer, reservation } = body
    try {
      // 首页发布 特殊处理 需要通知商家
      if (type === '1') {
        if (publishType !== 'force') {
          const params: UpdateParams = { reservation, status: DesignStatus.TIMING }
          if (timer) {
            params.timer = timer
            params.status = DesignStatus.TIMER
            const res = await timing(id, params)
            // 数据保存成功后 开始定时任务
            console.log(res)
            if (res) {
              // 先开始定时任务
              const timeToTimer = new Date(timer)
              const timeToTimerJob = new CronJob(timeToTimer, () => {
                // 开始商家拒绝
                console.log(`开始定时任务: id: ${id}-type: ${type}`)
                timing(id, { status: DesignStatus.TIMING })
              })
              timeToTimerJob.start()
              // 最后开始拒绝任务
              const timeToReservation = new Date(reservation)
              const reservationJob = new CronJob(timeToReservation, () => {
                // 开始发布
                console.log(`1 首页开始发布: ${id}-${type}`)
                publishHome(id)
              })
              reservationJob.start()
            }
          } else {
            const res = await timing(id, params)
            if (res) {
              const timer = new Date(reservation)
              const reservationJob = new CronJob(timer, () => {
                // 立即发布 + 商家预留时间 TODO: 需要用其他的发布方法
                console.log(`2 开始发布: ${id}-${type}`)
                publishHome(id)
              })
              reservationJob.start()
            }
          }
        } else {
          await publishForce(id)
        }
      } else {
        if (publishType === 'timing') {
          const res = await timing(id, { timer, status: DesignStatus.TIMING })
          if (res) {
            const timeToPublish = new Date(timer)
            const publishJob = new CronJob(timeToPublish, () => {
              // 定时发布
              console.log(`3 开始发布: ${id}-${type}`)
              publish({ id, type })
            })
            publishJob.start()
          }
        } else {
          await publish({ id, type })
        }
      }
      ctx.status = 200
      ctx.body = { code: 1 }
    } catch (error) {
      console.log(error)
      ctx.status = 500
      ctx.body = { msg: error }
    }

  }

  // 商家更新装修数据
  public static async updateO2o(ctx: Context) {
    const { body: { id, data, name, o2oId, shopId } } = ctx.request
    // 如果 o2oId 和 shopId 一样则直接修改
    try {
      ctx.status = 200
      if (+o2oId === +shopId) {
        await update({ id, data })
        ctx.body = { id, data, name, shopId }
      } else {
        const res = await add({
          name,
          data,
          shopId: o2oId,
          type: DesignType.HOME,
          status: DesignStatus.PUBLISH,
        })
        if (res && res.id) {
          ctx.body = { ...res }
        } else {
          ctx.body = null
        }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: '数据更新失败', error: error.message }
    }
  }

  // 更新装修数据
  public static async update(ctx: Context) {
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
  // 获取首页模板
  public static async getO2o(ctx: Context) {
    const { shopId } = ctx.query
    try {
      let body = null
      const res = await getHome(shopId)
      if (res && is(Array, res) && res.length) {
        const design = find(propEq('shopId', +shopId), res) || last(res)
        if (design && design.id) {
          const { id, name, data, shopId } = design
          body = { id, name, data, shopId }
        }
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
    const res = await getShopHistory(shopId)
    ctx.status = 200
    ctx.body = res
  }
  // 商家拒绝
  /**
   * 需要处理: 如果当前商家有拒绝过 而且存在已经发布的模板 则不处理 如果商家是第一次拒绝 则获取到当前生效的模板 为其创建一条数据
   * 并设置 status 为 3
   */
  public static async reject(ctx: Context) {
    const { body } = ctx.request
    const refuse = await getRefuse(body)
    if (refuse && refuse.id) {
      ctx.status = 200
      ctx.body = {
        msg: '已经拒绝过该模板',
        code: -1,
      }
    } else {
      const current = await getShopPublish(body.shopId)
      // 当前商家是否有发布的模板
      if (!current) {
        // 如果商家没有发布的模板 则获取当前生效的模板 给当前这个商家
        const design = await getPublish(DesignType.HOME)
        if (design && design.id) {
          const { name, data, type, status } = design
          await add({ name, data, type, status, shopId: body.shopId })
        }
      }
      // 如果有的话 添加数据到拒绝表 防止最新版本的覆盖
      const res = await addRefuse(body)
      if (res) {
        ctx.status = 200
        ctx.body = res
      }
    }
  }
}
