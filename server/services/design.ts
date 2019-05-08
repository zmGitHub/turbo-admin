import { getRepository, Repository } from 'typeorm'
import { Design } from '../models/design'

export interface Params {
  name: string,
  type: number
}

export interface Query {
  pageNo: number,
  pageSize: number,
  type: number
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
