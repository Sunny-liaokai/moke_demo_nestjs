import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigService } from '@nestjs/config'; //导入环境变量服务
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/login')
  getHello(): string {
    // console.log(this.configService.get('REQUEST_URL'));
    return this.appService.getHello();
  }
}
