import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity('Roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[];
}
