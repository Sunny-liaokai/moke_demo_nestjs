import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEntity } from '@/logs/logs.entity';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';


@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, LogsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
