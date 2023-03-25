import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from 'src/common';
import { configuration, getMulterModuleOptions, getServerStaticModuleOptions, getTypeOrmModuleOptions } from 'src/config';
import { RouteModule } from 'src/routes';

@Module({
    imports : [
        // Configuration
        // https://docs.nestjs.com/techniques/configuration
        ConfigModule.forRoot({
            isGlobal : true,
            load     : [configuration],
        }),
        // Database
        // https://docs.nestjs.com/techniques/database
        TypeOrmModule.forRootAsync({
            useFactory : getTypeOrmModuleOptions,
            inject     : [ConfigService],
        }),
        // Static Folder
        // https://docs.nestjs.com/recipes/serve-static
        // https://docs.nestjs.com/techniques/mvc
        ServeStaticModule.forRoot(getServerStaticModuleOptions()),
        MulterModule.registerAsync({
            useFactory : getMulterModuleOptions,
        }),
        // Service Modules
        CommonModule, // Global
        // Route modules
        RouteModule,
    ],
    providers : [
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
