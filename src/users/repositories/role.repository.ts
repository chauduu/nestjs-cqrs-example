import { EntityRepository, Repository } from 'typeorm';
import { Roles } from '../models/entities/role.entity';

@EntityRepository(Roles)
export class RoleRepository extends Repository<Roles> {}
