import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Design } from './design'

@Entity('refuse_user')
export class Refuse {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  shopId: number

  @Column()
  designId: number

  @ManyToOne(type => Design, design => design.refuses)
  design: Design
}
