import { Logger as NestLogger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { Logger } from './common';
import { BodyFilter, GlobalExceptionFilter } from './common/filters';
import { BodyException } from './shared';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<string> {
    const isProduction = process.env.NODE_ENV === 'production';
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs : true,
    });

    app.useLogger(await app.resolve(Logger));

    // https://docs.nestjs.com/techniques/validation
    app.useGlobalFilters(new GlobalExceptionFilter(), new BodyFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform            : true, // transform object to DTO class
            disableErrorMessages : false,
            exceptionFactory     : (errors: ValidationError[]): BodyException => {
                const errMsg: Record<string, any> = {};
                errors.forEach((err: ValidationError) => {
                    if (err.constraints) {
                        errMsg[err.property] = [...Object.values(err.constraints)];

                        if (err.children) {
                            // TODO: check recursive child message

                            err.children.forEach((child: ValidationError) => {
                                if (child.constraints) {
                                    errMsg[err.property] = [...Object.values(child.constraints)];
                                }
                            });
                        }
                    }
                });

                return new BodyException(errMsg);
            },
        }),
    );

    if (isProduction) {
        app.enable('trust proxy');
    }

    // Express Middleware
    middleware(app);

    await app.listen(process.env.PORT || 3000);

    return app.getUrl();
}

(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        NestLogger.log(url, 'Bootstrap');
    } catch (error) {
        NestLogger.error(error, 'Bootstrap');
    }
})();
