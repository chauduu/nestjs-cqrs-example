import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
