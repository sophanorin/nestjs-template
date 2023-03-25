import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export function getJwtModuleOptions(config: ConfigService): JwtModuleOptions {
    const defaultSecret = 'D#f@&1t';
    return {
        secret      : config.get('jwtSecret') || defaultSecret,
        signOptions : { expiresIn: '1d' },
    };
}
