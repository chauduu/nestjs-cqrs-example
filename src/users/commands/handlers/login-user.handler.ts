import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { UserMapper } from 'src/users/interfaces/user.mapper';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUserCommand } from '../impl/login-user.command';
import { UserTokenDto } from 'src/users/models/dtos/response/user-token.dto';
import { generateToken } from 'src/users/utils/token.utils';
import { RoleEnum } from 'src/users/models/enums/role.enum';
@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(command: LoginUserCommand) {
    const { username, password } = command;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new UnauthorizedException('Username not exists');
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const userToken = new UserTokenDto();
    userToken.user = this.userMapper.mapToDto(user);
    const rolesEnumArray: RoleEnum[] = user.roles.map((role) => {
      if (Object.values(RoleEnum).includes(role.name as RoleEnum)) {
        return role.name as RoleEnum;
      }
      return RoleEnum.USER;
    });

    userToken.token = await generateToken(user.id, rolesEnumArray);
    return userToken;
  }
}
