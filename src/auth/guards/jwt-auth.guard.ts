import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public override handleRequest(err: any, user: any, _info: Error): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

    public override getRequest(context: ExecutionContext): Request {
        return context.switchToHttp().getRequest<Request>();
    }
}
