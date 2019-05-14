import { getRepository, Repository, In } from 'typeorm'
import { Design, DesignStatus, DesignType } from '../models/design'

export interface Params {
  name: string,
  type: any
}

export interface Query {
  pageNo: number,
  pageSize: number,
  type: any
}

export const get = async (id) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const design: Design = await designRpo.findOne(id)
  return design
}

export const add = async (params: Params) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const design: Design = designRpo.create(params)
  return await designRpo.save(design)
}

export const query = async (params: Query) => {
  const { pageNo, pageSize, type } = params
  const designRpo:Repository<Design> = getRepository(Design)
  const list = await designRpo.createQueryBuilder('designQuery')
  .where('designQuery.type = :type', { type })
  .orderBy('designQuery.createAt')
  .skip((pageNo - 1) * pageSize)
  .take(pageSize)
  .getManyAndCount()
  return list
}

// 获取模板最新发布的数据
export const getTiming = async () => {
  const designRpo:Repository<Design> = getRepository(Design)
  const res = designRpo.findOne({
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
export const getHistory = async (id:number) => {
  const designRpo:Repository<Design> = getRepository(Design)
  const params: any = {
    type: DesignType.HOME,
    status: DesignStatus.INIT,
    shopId: id,
  }
  const res = await designRpo.find(params)
  return res
}
