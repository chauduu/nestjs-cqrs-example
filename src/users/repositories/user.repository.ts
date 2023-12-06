import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/entities/user.entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
