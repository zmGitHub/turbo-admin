import { getRepository, Repository } from 'typeorm'
import { Refuse } from '../models/refuse'

interface Params {
  shopId: number,
  designId: number
}

export const addRefuse = async (params: Params) => {
  const refuseRpo: Repository<Refuse> = getRepository(Refuse)
  return await refuseRpo.save(params)
}

// 根据装修 id
export const getRefuse = async (params: Params) => {
  const refuseRpo: Repository<Refuse> = getRepository(Refuse)
  return await refuseRpo.findOne(params)
}
