import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from 'src/users/interfaces/user.mapper';
import { GetUserByIdQuery } from '../impl/get-user-id.query';
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(Users)
    private readonly repository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    const user = await this.repository.findOne({
      where: { id: id },
    });
    return this.userMapper.mapToDto(user);
  }
}
