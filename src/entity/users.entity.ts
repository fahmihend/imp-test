import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'fullname' })
  fullname: string;
}
