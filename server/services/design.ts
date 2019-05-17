import { getRepository, Repository, In, Not } from 'typeorm'
import { head, map, append } from 'ramda'
import { Design, DesignStatus, DesignType } from '../models/design'

export interface AddParams {
  id?: number,
  shopId?: number,
  name: string,
  type?: DesignType,
  poster?: string,
  status?: DesignStatus,
  data?: string,
  timer?: string,
  reservation?: string,
}

export interface UpdateParams {
  id?: number,
  name?: string,
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
  type: string
}

export const get = async (id) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const design: Design = await designRpo.findOne(id)
  return design
}

export const add = async (params: AddParams) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const design: Design = designRpo.create(params)
  return await designRpo.save(design)
}

// 模板定时
export const timing = async (id: number, params: UpdateParams) => {
  const designRpo:Repository<Design> = getRepository(Design)
  return await designRpo.update(id, params)
}

// 发布首页模板
export const publishHome = async (id: number) => {
  const designRpo:Repository<Design> = getRepository(Design)
  // 找到拒绝的商家 id
  const designs = await designRpo.find({
    relations: ['refuses'],
    where: { id },
  })
  if (designs && designs.length) {
    // 处理那些没有拒绝的商家
    const { refuses } = head(designs)
    const shopIds = map(({ shopId }) => shopId, refuses)
    const ids = append(1, shopIds)
    const res = await designRpo.createQueryBuilder('design')
    .update(Design)
    .set({ status: DesignStatus.INIT })
    .where('shopId NOT IN (:...ids)', { ids })
    .execute()
    console.log(res)
  }
  // 发布当前模板
  return await publish({ id, type: DesignType.HOME })
}

// 首页强制发布模板
export const publishForce = async (id: number) => {
  const designRpo:Repository<Design> = getRepository(Design)
  // 先取消掉发布的模板 商家和系统默认的
  const resetRes = await designRpo.update(
    {
      status: DesignStatus.PUBLISH,
      type: DesignType.HOME,
    },
    { status: DesignStatus.INIT })

  const updateRes = await designRpo.update(id, { status: DesignStatus.PUBLISH })
  return { resetRes, updateRes }
}

// 发布模板
export const publish = async (params: UpdateParams) => {
  const designRpo:Repository<Design> = getRepository(Design)
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

export const update = async (params: UpdateParams) => {
  const designRpo:Repository<Design> = getRepository(Design)
  return await designRpo.createQueryBuilder('designUpdate')
  .update(Design)
  .set(params)
  .where('id = :id', { id: params.id })
  .execute()
}

export const query = async (params: Query) => {
  const { pageNo, pageSize, type } = params
  const designRpo:Repository<Design> = getRepository(Design)
  const list = await designRpo.createQueryBuilder('design')
  .where('design.type = :type', { type })
  .andWhere('design.shopId = :shopId', { shopId: 1 })
  .orderBy('design.createAt')
  .skip((pageNo - 1) * pageSize)
  .take(pageSize)
  .getManyAndCount()
  return list
}

// 获取发布的模板
export const getPublish = async (type: DesignType) => {
  const designRpo:Repository<Design> = getRepository(Design)
  return await designRpo.findOne({
    type,
    status: DesignStatus.PUBLISH,
  })
}

// 获取模板最新发布的数据
export const getTiming = async () => {
  const designRpo:Repository<Design> = getRepository(Design)
  const res = await designRpo.findOne({
    type: DesignType.HOME,
    status: DesignStatus.TIMING,
  })
  return res
}

// 获取店铺的首页装修数据
export const getHome = async (id:number) => {
  // TODO: 加 cache
  const designRpo:Repository<Design> = getRepository(Design)
  const params: any = {
    status: DesignStatus.PUBLISH,
    type: DesignType.HOME,
    shopId: In([1, id]),
  }
  const res = await designRpo.find(params)
  return res
}

// 获取店铺历史装修数据
export const getShopHistory = async (id:number) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const params: any = {
    type: DesignType.HOME,
    status: DesignStatus.INIT,
    shopId: id,
  }
  const res = await designRpo.find(params)
  return res
}

// 获取店铺当前生效的
export const getShopPublish = async (id:number) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const params: any = {
    type: DesignType.HOME,
    status: DesignStatus.PUBLISH,
    shopId: id,
  }
  const res = await designRpo.findOne(params)
  return res
}
