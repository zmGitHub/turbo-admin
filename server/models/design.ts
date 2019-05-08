import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { Refuse } from './refuse'

export enum DesignType {
  HOME = 1,
  ACTIVITY = 2,
  PREFECTURE = 3,
  OTHER = 4,
}

export enum DesignStatus {
  INIT = 0,
  PUBLISH = 1,
}

@Entity('component')
export class Design {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  data: string

  @Column({
    type: 'enum',
    enum: DesignType,
    default: DesignType.HOME,
  })
  type: DesignType

  @Column({
    type: 'enum',
    enum: DesignStatus,
    default: DesignStatus.INIT,
  })
  status: DesignStatus

  @Column({ nullable: true })
  poster: string

  @Column({ type: 'datetime', nullable: true })
  timer: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @OneToMany(type => Refuse, refuse => refuse.designId)
  refuses: Refuse[]
}
