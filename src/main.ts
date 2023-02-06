import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from '@/filter/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    //关闭整个nestjs日志
    // logger: false
    // logger: ['error', 'warn'],
  });
  //全局过滤器  app.get()需要传递一个实例供内部使用，检索可注入对象或控制器的实例，否则抛出异常。
  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)));
  //替换nest原生的日志 使用winston日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
