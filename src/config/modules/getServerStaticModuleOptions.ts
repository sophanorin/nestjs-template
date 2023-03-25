/* eslint-disable @typescript-eslint/no-misused-promises */
import { ServeStaticModuleOptions } from '@nestjs/serve-static';

export function getServerStaticModuleOptions(): ServeStaticModuleOptions {
    return {
        rootPath   : `${__dirname}/../public`,
        renderPath : '/',
    };
}
