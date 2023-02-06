import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { LogEnum } from '@/enum/enum';

const Console = () => {
  return new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(), //时间显示
      nestWinstonModuleUtilities.format.nestLike('winstonLogs', {
        prettyPrint: true, //格式换行打印
        colors: true, //颜色打印
      }),
    ),
  });
};

const DailyRotateFile = (level: string, prefix: string) => {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: 'app_Logs',
    filename: `${prefix}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true, // 是否压缩文档
    maxSize: '20m', // 文件最大大小
    maxFiles: '14d', // 文件保存最大天数
    format: winston.format.combine(
      winston.format.timestamp(), //时间显示
      winston.format.simple(),
    ),
  });
};
/*注入日志模块 根据需求配置滚动日志 需要在全局引入和替换掉 */
@Module({
  imports: [
    WinstonModule.forRootAsync({
      // options
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transports: [
            Console(),
            ...(config.get(LogEnum.LOG_DAILY_FILE) === 'true'
              ? [
                  DailyRotateFile('error', 'error'),
                  DailyRotateFile('warn', 'warn'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
