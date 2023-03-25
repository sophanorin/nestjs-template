import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BodyException } from 'src/shared';

@Catch(BodyException)
export class BodyFilter implements ExceptionFilter {
    public catch(exception: BodyException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const responseException: { statusCode: string; message: string } = Object(exception.getResponse());

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return response.status(status).json({
            statusCode : status,
            success    : false,
            message    : responseException.message,
            error      : exception.validationErrors,
        });
    }
}
