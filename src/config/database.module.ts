import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/users/models/entities/role.entity';
import { Users } from 'src/users/models/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Abcd@123',
      database: 'test_db',
      entities: [Users, Roles],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
