import { Injectable, NestMiddleware } from '@nestjs/common';
import { webcrypto } from 'crypto';
import type { Request, Response } from 'express';

import { Logger } from '../providers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private passUrl: string[] = ['/health', '/graphql'];
    // GraphQL logging uses the apollo plugins.
    // https://docs.nestjs.com/graphql/plugins
    // https://www.apollographql.com/docs/apollo-server/integrations/plugins/
    // https://github.com/nestjs/graphql/issues/923

    constructor(private readonly logger: Logger) {}

    public use(req: Request, res: Response, next: () => void): void {
        if (this.passUrl.includes(req.originalUrl)) {
            return next();
        }

        req.id = req.header('X-Request-Id') || webcrypto.randomUUID();
        res.setHeader('X-Request-Id', req.id);

        const user = req.user?.userId || '';
        this.logger.log(`${req.method} ${req.originalUrl} - ${String(req.ip).replace('::ffff:', '')} ${user}`);

        return next();
    }
}
