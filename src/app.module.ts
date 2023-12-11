import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UsersModule, DatabaseModule, CoursesModule],
})
export class AppModule {}
