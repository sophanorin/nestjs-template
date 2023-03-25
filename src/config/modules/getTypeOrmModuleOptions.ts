/* eslint-disable @typescript-eslint/no-misused-promises */
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmModuleOptions(config: ConfigService): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
        ...config.get('db'),
    };
}
