import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('component_auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  data: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
