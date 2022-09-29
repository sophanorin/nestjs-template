import {
    Catch,
    Logger,
    HttpStatus,
    HttpException,
    ArgumentsHost,
    ExceptionFilter,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { GlobalResponseError } from 'src/shared';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let { message }: { message: string } = exception.message;
        let code = 'HttpException';

        Logger.error(message, exception.stack, `${request.method} ${request.url}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case NotFoundException: {
                const notFoundException = exception as NotFoundException;
                status = notFoundException.getStatus();
                message = notFoundException.message;
                code = notFoundException.name;
                break;
            }
            case ForbiddenException: {
                const forbiddenException = exception as ForbiddenException;
                status = forbiddenException.getStatus();
                message = forbiddenException.message;
                code = forbiddenException.name;
                break;
            }
            case BadRequestException: {
                const badRequestRxception = exception as BadRequestException;
                status = badRequestRxception.getStatus();
                message = badRequestRxception.message;
                code = badRequestRxception.name;
                break;
            }
            case HttpException: {
                const httpException = exception as HttpException;
                status = httpException.getStatus();
                message = httpException.message;
                break;
            }
            case QueryFailedError: {
                // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as QueryFailedError).message;
                code = exception.code;
                break;
            }
            case EntityNotFoundError: {
                // this is another TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as EntityNotFoundError).message;
                code = exception.code;
                break;
            }
            case CannotCreateEntityIdMapError: {
                // and another
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as CannotCreateEntityIdMapError).message;
                code = exception.code;
                break;
            }
            case UnauthorizedException: {
                const unauthorizedException = exception as UnauthorizedException;
                status = unauthorizedException.getStatus();
                message = unauthorizedException.message;
                code = unauthorizedException.name;
                break;
            }
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        response.status(status).json(GlobalResponseError(status, message, code, request));
    }
}
