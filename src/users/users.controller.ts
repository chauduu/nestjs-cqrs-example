import { Post, Get, Controller, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUsersQuery } from './queries/impl/get-user.query';
import { UserCreatedDto } from './models/dtos/request/user-created.dto';

@Controller('profiles')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('signup')
  public async signUp(@Body() input: UserCreatedDto) {
    try {
      return await this.commandBus.execute(
        new CreateUserCommand(input.username, input.email, input.password),
      );
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }
  @Get()
  public async getUser() {
    try {
      return await this.queryBus.execute(new GetUsersQuery());
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }
}
