import { MulterModuleOptions } from '@nestjs/platform-express';

export function getMulterModuleOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
        dest : './upload',
    };
}
