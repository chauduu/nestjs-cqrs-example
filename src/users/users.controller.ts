import { UserLoginDto } from './models/dtos/request/user-login.dto';
import { Post, Get, Controller, Body, UseGuards, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUsersQuery } from './queries/impl/get-user.query';
import { UserCreatedDto } from './models/dtos/request/user-created.dto';
import { LoginUserCommand } from './commands/impl/login-user.command';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RolesGuard } from './middleware/role.guard';
import { RoleEnum } from './models/enums/role.enum';
import { GetUserByIdQuery } from './queries/impl/get-user-id.query';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationRequestDto } from './models/dtos/request/pagination-request.dto';

@ApiTags('Profiles')
@Controller('profiles')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('signup')
  public async signUp(@Body() input: UserCreatedDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(
        input.username,
        input.email,
        input.password,
        input.roles,
      ),
    );
  }
  @Post('signin')
  public async signIn(@Body() input: UserLoginDto) {
    return await this.commandBus.execute(
      new LoginUserCommand(input.username, input.password),
    );
  }
  @UseGuards(AuthMiddleware, new RolesGuard([RoleEnum.ADMIN]))
  @Get()
  public async getUser(@Body() input: PaginationRequestDto) {
    return await this.queryBus.execute(
      new GetUsersQuery(input.page, input.limit),
    );
  }
  @UseGuards(AuthMiddleware)
  @Get('me')
  public async getUserByMe(@Req() req: Request) {
    const userId = req['userId'];
    return await this.queryBus.execute(new GetUserByIdQuery(userId));
  }
}
