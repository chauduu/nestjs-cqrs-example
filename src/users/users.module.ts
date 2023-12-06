import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './users.controller';
import { UsersSagas } from './sagas/user.saga';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UserCreatedEvent } from './events/impl/user-created.event';
import { DatabaseModule } from 'src/config/database.module';
import { Users } from './models/entities/user.entity';
import { GetUsersHandler } from './queries/handlers/get-user.handler';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUsersHandler];
export const EventHandlers = [UserCreatedEvent];

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users]),
    CqrsModule,
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    UsersSagas,
  ],
})
export class UsersModule {}
