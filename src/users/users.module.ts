import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { EventStoreService } from './events/stores/user-created.store';
import { ReplayLogic } from './events/logic/replay-logic';
import { RoleRepository } from './repositories/role.repository';
import { Roles } from './models/entities/role.entity';
import { UserMapper } from './interfaces/user.mapper';
import { LoginUserHandler } from './commands/handlers/login-user.handler';
import { AuthMiddleware } from './middleware/auth.middleware';
import { GetUserByIdHandler } from './queries/handlers/get-user-id.handler';
export const CommandHandlers = [CreateUserHandler, LoginUserHandler];
export const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];
export const EventHandlers = [UserCreatedEvent];

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Roles]),
    CqrsModule,
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    RoleRepository,
    UserMapper,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    UsersSagas,
    EventStoreService,
    AuthMiddleware,
    ReplayLogic,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'profiles', method: RequestMethod.GET },
        { path: 'profiles/me', method: RequestMethod.GET },
      );
  }
}
