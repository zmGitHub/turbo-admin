import { Context } from 'koa'
import { CronJob } from 'cron'
import { is, head, last, find, propEq, map } from 'ramda'
import { DesignStatus, DesignType } from '../models/design'
import {
  get, add, update, query, getOneByPath,
  getPublish, getO2oTiming, getO2oHome,
  getO2oHistory, getO2oPublish, publishO2o,
  publishAdmin, timing, remove,
} from '../services/design'

import { addRefuse, getRefuse } from '../services/refuse'

import request from '../services/request'

export default class Design {
  // 根据 path 获取装修数据
  public static async getByPath(ctx:Context, next: () => void) {
    const { path } = ctx.query
    const res = await getOneByPath(path)
    ctx.status = 200
    if (res && res.id) {
      const { id, name, data, posterId } = res
      ctx.body = { id, name, data, posterId }
    } else {
      ctx.body = ''
    }
    await next()
  }
  // 根据 path 获取o2o装修数据 getO2oByPath
  public static async getO2oByPath(ctx:Context, next: () => void) {
    const { path } = ctx.query
    const res = await getOneByPath(path, -1)
    ctx.status = 200
    if (res && res.id) {
      const { id, name, data, posterId } = res
      ctx.body = { id, name, data, posterId }
    } else {
      ctx.body = ''
    }
    await next()
  }
  // 根据 id 获取数据
  public static async getById(ctx:Context, next: () => void) {
    const { id } = ctx.params
    const res = await get(id)
    ctx.status = 200
    if (res && res.id) {
      const { id, name, data, posterId } = res
      ctx.body = { id, name, data, posterId }
    } else {
      ctx.body = ''
    }
    await next()
  }

  // 获取单个装修
  public static async getDesignById(ctx:Context) {
    const { id } = ctx.params
    const res = await get(id)
    ctx.status = 200
    if (res && res.id) {
      const { id, name, data, posterId } = res
      ctx.body = { id, name, data, posterId }
    } else {
      ctx.body = ''
    }
  }

  // 获取发布了的模板
  public static async getPublishData(ctx:Context) {
    const { type } = ctx.query
    const res = await getPublish({ type, shopId: 1 })
    let body = null
    if (res && res.id) {
      const { id, name, data, posterId } = res
      body = { id, name, data, posterId }
    }
    ctx.status = 200
    ctx.body = body || { msg: '暂无最新模板' }
  }

  // 获取发布中的数据
  public static async getTiming(ctx:Context) {
    const res = await getO2oTiming()
    ctx.status = 200
    ctx.body = res || { msg: '暂无最新模板' }
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
        }) => ({ canPublish: !!data, ...rest }),
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
    try {
      const res = await add(body)
      ctx.status = 200
      ctx.body = res
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: `模板路径: ${body.path}已存在` }
    }
  }

  // 首页装修模板发布
  public static async publishAdmin(ctx: Context) {
    try {
      const { body } = ctx.request
      const { id, type, timer } = body
      ctx.status = 200
      // 立即发布
      if (!timer) {
        const res = await publishAdmin({ id, type })
        ctx.body = res
      } else {
        // 定时发布
        const res = await timing(id, { timer, status: DesignStatus.TIMING })
        if (res) {
          const timeToTimer = new Date(timer)
          const reservationJob = new CronJob(timeToTimer, () => {
            // 立即发布 + 商家预留时间 TODO: 需要用其他的发布方法
            console.log(`2 开始发布: ${id}-${type}`)
            publishAdmin({ id, type })
          })
          reservationJob.start()
        }
        ctx.body = res
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: '发布失败', error: error.message }
    }
  }

  // 商家首页装修模板发布
  public static async publishO2o(ctx: Context) {
    try {
      const { body } = ctx.request
      const { id, timer, hours } = body
      ctx.status = 200
      // 立即发布
      const res = await timing(id, { timer, status: DesignStatus.TIMING })
      if (res) {
        const timeToTimer = new Date(timer)
        const reservationJob = new CronJob(timeToTimer, () => {
          // 立即发布 + 商家预留时间
          console.log(`2 o2o开始发布: ${id}`)
          publishO2o(id)
        })
        reservationJob.start()
        // 定时开始后 发布通知
        request.post(`/api/hisense/o2o/template/send-sms?hours=${hours}`).then((res) => {
          console.log('开始通知商家')
          console.log(res)
        }).catch((error) => {
          console.log('通知失败...')
          console.log(error)
        })
        ctx.body = res
      }
      ctx.body = res
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: '发布失败', error: error.message }
    }
  }

  // 更新装修数据
  public static async update(ctx: Context) {
    const { body } = ctx.request
    try {
      const res = await update(body)
      if (res && res.raw && res.raw.affectedRows) {
        ctx.status = 200
        ctx.body = res
      } else {
        ctx.status = 500
        ctx.body = { msg: '更新失败' }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: `模板路径: ${body.path}已存在` }
    }

  }

  // 删除
  public static async delete(ctx: Context) {
    const { id } = ctx.params
    const res = await remove(id)
    ctx.status = 200
    ctx.body = res
  }
  // 商家更新装修数据
  public static async updateO2o(ctx: Context) {
    const { body: { id, data, name, path, o2oId, shopId } } = ctx.request
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
          path,
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

  // 根据商家 id 查询正在使用的店铺模板
  public static async getHome(ctx: Context, next: () => void) {
    const res = await getPublish({ type: DesignType.HOME, shopId: 1 })
    let body = null
    if (res && res.id) {
      const { id, name, data, posterId } = res
      body = { id, name, data, posterId }
    }
    ctx.status = 200
    ctx.body = body || { msg: '暂无最新模板' }
    await next()
  }

  // 获取首页模板
  public static async getO2o(ctx: Context, next: () => void) {
    const { shopId } = ctx.query
    try {
      let body = null
      const res = await getO2oHome(shopId)
      if (res && is(Array, res) && res.length) {
        const design = find(propEq('shopId', +shopId), res) || last(res)
        if (design && design.id) {
          const { id, name, data, shopId } = design
          body = { id, name, data, shopId }
        }
      }
      ctx.status = 200
      ctx.body = body
      await next()
    } catch (error) {
      ctx.status = 500
      ctx.body = { msg: error.message }
    }
  }
  // 获取商家历史模板数据
  public static async getHistory(ctx: Context) {
    const { shopId } = ctx.query
    const res = await getO2oHistory(shopId)
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
      const current = await getO2oPublish(body.shopId)
      // 当前商家是否有发布的模板
      if (!current) {
        // 如果商家没有发布的模板 则获取当前生效的模板 给当前这个商家
        const design = await getPublish({ type: DesignType.HOME, shopId: -1 })
        if (design && design.id) {
          const { name, path, data, type, status } = design
          await add({ name, path, data, type, status, shopId: body.shopId })
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
