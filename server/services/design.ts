import { getRepository, Repository, In } from 'typeorm'
import { head, map, concat } from 'ramda'
import { Design, DesignStatus, DesignType } from '../models/design'
const cache = require('./cache')

const cacheMs = 60000
export interface AddParams {
  id?: number,
  shopId?: number,
  name: string,
  path: string,
  type?: DesignType,
  poster?: string,
  status?: DesignStatus,
  data?: string,
  timer?: string,
  reservation?: string,
}

export interface UpdateParams {
  id?: number,
  shopId?: number,
  name?: string,
  path?: string,
  type?: DesignType,
  poster?: string,
  status?: DesignStatus,
  data?: string,
  timer?: string,
  reservation?: string,
}

export interface Query {
  pageNo: number,
  pageSize: number,
  type: DesignType,
  shopId?: number,
  query: any,
}

export interface GetParams {
  type: DesignType,
  shopId: number
}

const getCacheKey = (params: Object) => {
  return `designComponent_${JSON.stringify(params)}`
}

export const getOneByPath = async (path: string, shopId?: number) => {
  const params: any = { path }
  if (shopId) {
    params.shopId = shopId
  }
  const cacheKey = getCacheKey(params)
  const cached = cache.get(cacheKey)
  if (cached) return cached
  const designRpo: any = getRepository(Design)
  // const design: Design = await designRpo.findOne({ where: params, cache: cacheMs })
  const design: Design = await designRpo.findOne({ where: params })
  cache.put(cacheKey, design, cacheMs)
  return design
}

export const get = async (id) => {
  const params = { id }
  const cacheKey = getCacheKey(params)
  const cached = cache.get(cacheKey)
  if (cached) return cached
  const designRpo: any = getRepository(Design)
  // const design: Design = await designRpo.findOne({ where: params, cache: cacheMs })
  const design: Design = await designRpo.findOne({ where: params })
  cache.put(cacheKey, design, cacheMs)
  return design
}

export const add = async (params: AddParams) => {
  const designRpo: any = getRepository(Design)
  const design: Design = designRpo.create(params)
  return await designRpo.save(design)
}

// 模板定时
export const timing = async (id: number, params: UpdateParams) => {
  const designRpo: any = getRepository(Design)
  return await designRpo.update(id, params)
}

// 发布模板
export const publishAdmin = async (params: UpdateParams) => {
  const designRpo: any = getRepository(Design)
  // 先取消掉发布的模板
  const resetRes = await designRpo.update(
    {
      status: DesignStatus.PUBLISH,
      type: params.type,
      shopId: 1,
    },
    { status: DesignStatus.INIT })

  const updateRes = await designRpo.update(params.id, { status: DesignStatus.PUBLISH })
  return { resetRes, updateRes }
}

export const remove = async (id: number) => {
  const designRpo: any = getRepository(Design)
  return await designRpo.delete(id)
}

export const update = async (params: UpdateParams) => {
  const designRpo: any = getRepository(Design)
  return await designRpo.createQueryBuilder('designUpdate')
    .update(Design)
    .set(params)
    .where('id = :id', { id: params.id })
    .execute()
}

export const query = async (params: Query) => {
  const { pageNo, pageSize, type, shopId = 1, query } = params
  const designRpo: any = getRepository(Design)
  let list = await designRpo.createQueryBuilder('design')
    .where('design.type = :type', { type })
    .andWhere('design.shopId = :shopId', { shopId })
  if (query) list = list
    .andWhere("(id = :queryValue or name like :query or path like :query)", { queryValue: query, query: `%${query}%` })
  return list.orderBy('design.createAt')
    .skip((pageNo - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount()
}

// 获取发布的模板
export const getPublish = async (params: GetParams) => {
  const designRpo: any = getRepository(Design)
  return await designRpo.findOne({
    type: params.type,
    status: DesignStatus.PUBLISH,
    shopId: params.shopId,
  })
}

// 发布o2o首页模板
export const publishO2o = async (id: number) => {
  const designRpo: any = getRepository(Design)
  // 找到拒绝的商家 id
  const designs = await designRpo.find({
    relations: ['refuses'],
    where: { id },
  })
  if (designs && designs.length) {
    // 处理那些没有拒绝的商家
    const { refuses } = head(designs)
    const shopIds = map(({ shopId }) => shopId, refuses)
    // 排除掉 商城模板和商家模板 1 -1
    const ids = concat([1, -1], shopIds)
    const res = await designRpo.createQueryBuilder('design')
      .update(Design)
      .set({ status: DesignStatus.INIT })
      .where('shopId NOT IN (:...ids)', { ids })
      .execute()
    console.log(res)
  }
  // 发布当前模板
  return await resetO2oPublish(id)
}

// 首页强制发布模板
export const resetO2oPublish = async (id: number) => {
  const designRpo: any = getRepository(Design)
  // 先取消掉发布的模板 商家和系统默认的
  const resetRes = await designRpo.update(
    {
      status: DesignStatus.PUBLISH,
      type: DesignType.HOME,
      shopId: -1,
    },
    { status: DesignStatus.INIT },
  )
  const updateRes = await designRpo.update(id, { status: DesignStatus.PUBLISH })
  return { resetRes, updateRes }
}

// 获取模板最新发布的数据
export const getO2oTiming = async () => {
  const designRpo: any = getRepository(Design)
  const res = await designRpo.findOne({
    type: DesignType.HOME,
    status: DesignStatus.TIMING,
    shopId: -1,
  })
  return res
}

// 获取店铺的首页装修数据
export const getO2oHome = async (id: number) => {
  const params: any = {
    status: DesignStatus.PUBLISH,
    type: DesignType.HOME,
    shopId: In([-1, id]),
  }

  const cacheKey = getCacheKey(params)
  const cached = cache.get(cacheKey)
  if (cached) return cached

  const designRpo: any = getRepository(Design)
  // const res = await designRpo.find({ where: params, cache: cacheMs })
  const res = await designRpo.find({ where: params })
  cache.put(cacheKey, res, cacheMs)
  return res
}

// 获取店铺历史装修数据
export const getO2oHistory = async (id: number) => {
  const designRpo: any = getRepository(Design)
  const params: any = {
    type: DesignType.HOME,
    status: DesignStatus.INIT,
    shopId: id,
  }
  const res = await designRpo.find(params)
  return res
}

// 获取店铺当前生效的
export const getO2oPublish = async (id: number) => {
  const designRpo: any = getRepository(Design)
  const params: any = {
    type: DesignType.HOME,
    status: DesignStatus.PUBLISH,
    shopId: id,
  }
  const res = await designRpo.findOne(params)
  return res
}
