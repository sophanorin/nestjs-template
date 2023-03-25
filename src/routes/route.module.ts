/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import * as ApiModules from 'src/api';
import { AwsModule } from 'src/aws';
import { BaseModule } from 'src/base';

@Module({
    imports : [
        BaseModule,
        AwsModule,
        ...Object.values(ApiModules),
        // Module Router
        // https://docs.nestjs.com/recipes/router-module
        RouterModule.register([
            {
                path   : 'aws',
                module : AwsModule,
            },
            {
                path     : 'api/v1',
                children : [
                    ...Object.values(ApiModules).map((module: any) => ({
                        path : '/',
                        module,
                    })),
                ],
            },
        ]),
    ],
})
export class RouteModule {}
