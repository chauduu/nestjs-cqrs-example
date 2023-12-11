import { CreateUserCommand } from '../impl/create-user.command';
import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Users } from 'src/users/models/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserCreatedEvent } from 'src/users/events/impl/user-created.event';
import { InjectRepository } from '@nestjs/typeorm';
//import { plainToClass } from 'class-transformer';
import { Roles } from 'src/users/models/entities/role.entity';
import { RoleRepository } from 'src/users/repositories/role.repository';
import { UserMapper } from 'src/users/interfaces/user.mapper';
import { hashPassword } from 'src/users/utils/hash.utils';
import { BadRequestException } from '@nestjs/common';
//import { EventStoreService } from 'src/users/events/stores/user-created.store';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    //private readonly eventStoreService: EventStoreService,
    @InjectRepository(Users)
    private readonly userRepository: UserRepository,
    @InjectRepository(Roles)
    private readonly roleRepository: RoleRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(command: CreateUserCommand) {
    const { username, email, password, roles } = command;
    const userExist = await this.userRepository.findOne({
      where: { username: username },
    });
    if (userExist) {
      throw new BadRequestException('Username already exists');
    }
    const emailExist = await this.userRepository.findOne({
      where: { email: email },
    });
    if (emailExist) {
      throw new BadRequestException('Email already exists');
    }
    const roleEntities = await Promise.all(
      roles.map(async (role) => {
        let roleEntity = await this.roleRepository.findOne({
          where: { name: role },
        });
        if (!roleEntity) {
          const newRole = this.roleRepository.create({ name: role });
          roleEntity = await this.roleRepository.save(newRole);
        }
        return roleEntity;
      }),
    );

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = await hashPassword(password);
    user.roles = roleEntities;
    //const user = plainToClass(Users, command);

    const userDB: Users = await this.userRepository.save(user);
    //const userCreatedEvent = new UserCreatedEvent(userDB.userId);
    //this.eventStoreService.saveEvent(userCreatedEvent); //test event sourcing
    this.sendEvent(userDB.id, this.eventBus);

    return this.userMapper.mapToDto(userDB);
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
