import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger as winstonLogger,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) // 如果初始化需要记录日志，则需要使用这行注入
    private readonly logger: winstonLogger,
  ) {
    this.logger.log('info-------');
    this.logger.warn('warn-------');
  }

  @Get()
  getUserAll(): any {
    return this.userService.getUserAll();
  }

  @Get('/userOne')
  getUserOne(@Param('id') id: number): any {
    return this.userService.getUserOne(id);
  }

  @Post('/addUser')
  create(@Body() body): any {
    return this.userService.AddUser(body as UsersEntity);
  }

  @Get('/profile')
  getUserProfile(@Query() query): any {
    return this.userService.findProfile(query.id);
  }

  @Get('/logs')
  getUserLogs(@Query() query): any {
    return this.userService.findUserLogs(query.id);
  }
  @Get('/logsGroupBy')
  async getLogsGroupBy(@Query() query): Promise<any> {
    throw new HttpException('请求失败', HttpStatus.INTERNAL_SERVER_ERROR);
    return await this.userService.findLogsByGroup(query.id);
  }
}
