import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConfigEnum } from '@/enum/enum';

import { ProfileModule } from './profile/profile.module';

import { ProfileEntity } from '@/profile/profile.entity';
import { UsersEntity } from '@/users/users.entity';
import { LogsEntity } from '@/logs/logs.entity';
import { RolesEntity } from '@/roles/roles.entity';

//  读取启动命令中设置的环境
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局可使用
      envFilePath, //自定义文件路径
      load: [() => dotenv.config({ path: '.env' })], // 读取.env的配置文件
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [UsersEntity, ProfileEntity, LogsEntity, RolesEntity],
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          logging: ['error'],
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    ProfileModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'example',
    //   database: 'testdb',
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
