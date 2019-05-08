import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Design } from './models/design'
import { Refuse } from './models/refuse'
import { mysql } from '../config'

const connectionOpts:ConnectionOptions = {
  type: 'mysql',
  entityPrefix: 'design_',
  ...mysql,
  synchronize: true, // 正式环境需要关闭
  entities: [Design, Refuse],
}

const connection:Promise<Connection> = createConnection(connectionOpts)

export default connection
