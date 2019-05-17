import { getRepository, Repository } from 'typeorm'
import { Auth } from '../models/auth'

interface Params {
  id?: number,
  data?: string
}

export const updateAuth = async (params: Params) => {
  const authRpo: Repository<Auth> = getRepository(Auth)
  let res = null
  if (params.id) {
    const { data } = params
    res = await authRpo.update(params.id, { data })
  } else {
    res = await authRpo.save(params)
  }
  return res
}

export const getAuth = async () => {
  const authRpo: Repository<Auth> = getRepository(Auth)
  return await authRpo.findOne()
}
