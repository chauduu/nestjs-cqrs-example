import { GetUsersQuery } from '../impl/get-user.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(Users)
    private readonly repository: UserRepository,
  ) {}

  async execute() {
    return await this.repository.find();
  }
}
