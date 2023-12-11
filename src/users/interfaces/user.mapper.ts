import { Injectable } from '@nestjs/common';
import { Users } from '../models/entities/user.entity';
import { UserDto } from '../models/dtos/response/user.dto';

@Injectable()
export class UserMapper {
  mapToDto(user: Users): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.roles = user.roles.map((role) => role.name);

    return userDto;
  }

  mapArrayToDto(users: Users[]): UserDto[] {
    return users.map((user) => this.mapToDto(user));
  }
}
