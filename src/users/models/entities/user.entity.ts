import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './role.entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @ManyToMany(() => Roles, { eager: true })
  @JoinTable()
  roles: Roles[];
}
