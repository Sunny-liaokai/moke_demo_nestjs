import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProfileEntity } from './src/profile/profile.entity';
import { UsersEntity } from './src/users/users.entity';
import { RolesEntity } from './src/roles/roles.entity';
import { LogsEntity } from './src/logs/logs.entity';

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'testdb',
  entities: [UsersEntity, LogsEntity, RolesEntity, ProfileEntity],
  synchronize: true,
} as TypeOrmModuleOptions;
