import { getRepository, Repository } from 'typeorm'
import { Poster, PosterStatus, PosterType } from '../models/poster'

export interface AddParams {
  id?: number,
  shopId?: number,
  name: string,
  type?: PosterType,
  poster?: string,
  status?: PosterStatus,
  data?: string,
  timer?: string,
}

export interface UpdateParams {
  id: number,
  shopId?: number,
  name?: string,
  type?: PosterType,
  poster?: string,
  status?: PosterStatus,
  data?: string,
  setting?: string,
  timer?: string,
}

export interface QueryParams {
  pageNo: number,
  pageSize: number,
  type: PosterType,
  shopId?: number
}

// 根据 id 获取数据
export const get = async (id) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const poster: Poster = await posterRpo.findOne(id)
  return poster
}

// 添加
export const add = async (params: AddParams) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const poster: Poster = posterRpo.create(params)
  return await posterRpo.save(poster)
}

// 更新
export const update = async (params: UpdateParams) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  return await posterRpo.createQueryBuilder('posterUpdate')
  .update(Poster)
  .set(params)
  .where('id = :id', { id: params.id })
  .execute()
}

// 获取列表
export const query = async (params: QueryParams) => {
  const { pageNo, pageSize, type, shopId = 1 } = params
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const list = await posterRpo.createQueryBuilder('poster')
  .where('poster.type = :type', { type })
  .andWhere('poster.shopId = :shopId', { shopId })
  .orderBy('poster.createAt')
  .skip((pageNo - 1) * pageSize)
  .take(pageSize)
  .getManyAndCount()
  return list
}
