import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger as winstonLogger,
} from '@nestjs/common';

// import * as requestIp from 'request-ip';
/**
 * 全局异常接管 统一处理反回异常报错数据格式
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: winstonLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    // console.log(response);
    // const request = ctx.getRequest();
    // console.log(request.headers);
    // console.log('IP', requestIp.getClientIp(request));
    const code = exception.getStatus();
    // 将错误记录到日志
    if (code >= 500) {
      this.logger.error(exception, HttpExceptionFilter.name);
    }
    response.status(code).json({
      code,
      message: exception.message || exception.name,
    });
  }
}
