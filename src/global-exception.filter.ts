import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(exception);

    switch (true) {
      case exception instanceof NotFoundException:
        response.status(404).json({
          statusCode: 404,
          message: exception.message,
        });
        break;

      default:
        response.status(500).json({
          message: 'Internal server error',
        });
        break;
    }
  }
}
