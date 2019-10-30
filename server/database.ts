import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Design } from './models/design'
import { Refuse } from './models/refuse'
import { Poster } from  './models/poster'
import { mysql } from '../config'

const connectionOpts:ConnectionOptions = {
  type: 'mysql',
  entityPrefix: 'design_',
  ...mysql,
  synchronize: true, // 正式环境需要关闭
  // cache: true,
  // logging: true,
  entities: [Design, Refuse, Poster],
}

const connection:Promise<Connection> = createConnection(connectionOpts)

export default connection
