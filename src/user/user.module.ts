import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { usersProviders } from './user.provider';
import { DatabaseModule } from '../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
