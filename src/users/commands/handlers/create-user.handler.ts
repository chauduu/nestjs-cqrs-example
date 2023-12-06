import { CreateUserCommand } from '../impl/create-user.command';
import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserCreatedEvent } from 'src/users/events/impl/user-created.event';
import { InjectRepository } from '@nestjs/typeorm';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(Users)
    private readonly repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const { username, email, password } = command;

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = password;

    const userDB: Users = await this.repository.save(user);

    this.sendEvent(userDB.userId, this.eventBus);

    return userDB;
  }

  private async sendEvent(userId: string, eventBus: EventBus) {
    if (userId !== undefined) {
      console.log('send event UserCreatedEvent');
      eventBus.publish(
        new UserCreatedEvent(Buffer.from(userId).toString('hex')),
      );
    }
  }
}
