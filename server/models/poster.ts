import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

export enum PosterType {
  HOME = '1',
  ACTIVITY = '2',
  GOODS = '3',
  OTHER = '4',
}

export enum PosterStatus {
  INIT = '0',
  TIMER = '1', // 定时发布
  TIMING = '2', // 已发布
}

@Entity('poster')
export class Poster {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  setting: string

  @Column({ type: 'text', nullable: true })
  data: string

  @Column({
    type: 'enum',
    enum: PosterType,
    default: PosterType.HOME,
  })
  type: PosterType

  @Column({
    type: 'enum',
    enum: PosterStatus,
    default: PosterStatus.INIT,
  })
  status: PosterStatus

  @Column({ type: 'text', nullable: true })
  poster: string

  @Column({ type: 'datetime', nullable: true })
  timer: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @Column({
    default: 1,
  })
  shopId: number
}
