import { GetUsersQuery } from '../impl/get-user.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from 'src/users/interfaces/user.mapper';
import { UserDto } from 'src/users/models/dtos/response/user.dto';
import { PaginationResponse } from 'src/users/models/dtos/response/pagination-response.dto';
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(Users)
    private readonly repository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(query: GetUsersQuery) {
    const { page, limit } = query;
    const options = {
      page: page || 1,
      limit: limit || 10,
    };
    const [users, totalItems] = await this.repository.findAndCount({
      relations: ['roles'],
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    const mappedUsers = users.map((user) => this.userMapper.mapToDto(user));
    const pagination = new PaginationResponse<UserDto>(
      options.page,
      options.limit,
      mappedUsers.length,
      totalItems,
      mappedUsers,
    );
    return pagination;
  }
}
