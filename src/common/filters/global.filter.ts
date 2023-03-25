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
    InternalServerErrorException,
    UnprocessableEntityException,
    PayloadTooLargeException,
    BadGatewayException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { GlobalResponseError } from 'src/shared';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError } from 'typeorm';

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
                const badRequestException = exception as BadRequestException;
                status = badRequestException.getStatus();
                message = badRequestException.message;
                code = badRequestException.name;
                break;
            }
            case UnprocessableEntityException: {
                const unprocessableException = exception as UnprocessableEntityException;
                status = unprocessableException.getStatus();
                message = unprocessableException.message;
                code = unprocessableException.name;
                break;
            }
            case HttpException: {
                const httpException = exception as HttpException;
                status = httpException.getStatus();
                message = httpException.message;
                code = httpException.name;
                break;
            }
            case BadGatewayException: {
                const badGatewayException = exception as BadGatewayException;
                status = badGatewayException.getStatus();
                message = badGatewayException.message;
                code = badGatewayException.name;
                break;
            }
            case PayloadTooLargeException: {
                const payloadTooLargeException = exception as PayloadTooLargeException;
                status = payloadTooLargeException.getStatus();
                message = payloadTooLargeException.message;
                code = payloadTooLargeException.name;
                break;
            }
            case InternalServerErrorException: {
                const httpException = exception as InternalServerErrorException;
                status = httpException.getStatus();
                message = httpException.message;
                code = httpException.name;
                break;
            }
            case QueryFailedError: {
                // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = 'Could not loads related objects! checks your related object ID you just provided.';
                code = exception.code;
                break;
            }
            case TypeError: {
                // this is a TypeOrm error

                const typeException = exception as TypeError;

                status = HttpStatus.BAD_REQUEST;
                message = typeException.message;
                code = exception.code;
                break;
            }
            case EntityNotFoundError: {
                // this is another TypeOrm error

                // const notFound = <EntityNotFoundError>exception;
                // message = notFound.message;
                status = HttpStatus.NOT_FOUND;
                message = 'Could not find matching object! checks your object ID you just provided.';
                code = exception.code;
                break;
            }
            case CannotCreateEntityIdMapError: {
                // and another
                const typeormException = exception as CannotCreateEntityIdMapError;

                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = typeormException.message;
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
            case TypeORMError: {
                const typeOrmError = exception as TypeORMError;
                status = HttpStatus.BAD_REQUEST;
                message = typeOrmError.message;
                code = typeOrmError.name;
                break;
            }
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        response.status(status).json(GlobalResponseError(status, message, code, request));
    }
}
