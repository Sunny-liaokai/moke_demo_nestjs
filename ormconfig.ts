import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotEvn from 'dotenv';
import { ConfigEnum } from '@/enum/enum';

// 根据环境获取不同环境下的实体文件
const entitiesDir =
  process.env.NODE_ENV === 'test'
    ? [__dirname + '/**/*.entity.ts']
    : [__dirname + '/**/*.entity{.js,.ts}'];

// 1.通过环境变量读取不同的.env文件

function getEnvFile(evn: string) {
  if (fs.existsSync(evn)) {
    return dotEvn.parse(fs.readFileSync(evn));
  }
  return {};
}
// 2.通过dotEVN来解析不同的配置
function buildConnectionOptions() {
  const defaultConfig = getEnvFile('.env');
  const EnvConfig = getEnvFile(`.env.${process.env.NODE_ENV || 'development'}`);
  const config = { ...defaultConfig, ...EnvConfig };
  const DB_SYNC: boolean = JSON.parse(config[ConfigEnum.DB_SYNC]);
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: DB_SYNC,
    logging: false,
  } as TypeOrmModuleOptions;
}

export const databaseParams = buildConnectionOptions();

export default new DataSource({
  ...databaseParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
