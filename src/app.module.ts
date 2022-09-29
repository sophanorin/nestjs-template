import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as ApiModules from './api';
import { AwsModule } from './aws';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from './common';
import { configuration } from './config';

@Module({
    imports: [
        // Configuration
        // https://docs.nestjs.com/techniques/configuration
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        // Database
        // https://docs.nestjs.com/techniques/database
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                ...config.get('db'),
            }),
            inject: [ConfigService],
        }),
        // Static Folder
        // https://docs.nestjs.com/recipes/serve-static
        // https://docs.nestjs.com/techniques/mvc
        ServeStaticModule.forRoot({
            rootPath: `${__dirname}/../public`,
            renderPath: '/',
        }),
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload',
            }),
        }),
        // Service Modules
        CommonModule, // Global
        BaseModule,
        AwsModule,
        ...Object.values(ApiModules),
        // Module Router
        // https://docs.nestjs.com/recipes/router-module
        RouterModule.register([
            {
                path: 'aws',
                module: AwsModule,
            },
            {
                path: 'api/v1',
                children: [
                    ...Object.values(ApiModules).map((module: any) => ({
                        path: '/',
                        module,
                    })),
                ],
            },
        ]),
    ],
    providers: [
        // Global Guard, Authentication check on all routers
        // { provide: APP_GUARD, useClass: AuthenticatedGuard },
        // Global Filter, Exception check
        { provide: APP_FILTER, useClass: ExceptionsFilter },
    ],
})
export class AppModule implements NestModule {
    // Global Middleware, Inbound logging
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
