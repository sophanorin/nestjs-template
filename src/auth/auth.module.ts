import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtModuleOptions } from 'src/config';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { UserModule } from '../shared/user';

@Module({
    imports : [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory : getJwtModuleOptions,
            inject     : [ConfigService],
        }),
    ],
    providers : [AuthService, AuthSerializer, LocalStrategy, JwtStrategy],
    exports   : [AuthService],
})
export class AuthModule {}
