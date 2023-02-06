import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

import { LogsModule } from './logs/logs.module';
import ormConfig from '../ormconfig';

//  读取启动命令中设置的环境
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局可使用
      envFilePath, //自定义文件路径
      load: [() => dotenv.config({ path: '.env' })], // 读取.env的配置文件
    }),
    TypeOrmModule.forRoot(ormConfig),
    ProfileModule,
    UsersModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
