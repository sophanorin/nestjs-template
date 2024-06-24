import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { AuthService, LocalLoginGuard, Payload, AuthenticatedGuard, LocalAuthGuard, JwtAuthGuard } from '../../auth';
import { ReqUser, Logger } from '../../common';
import { LocalLoginDto } from '../dto';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private auth: AuthService, private readonly logger: Logger) {}

    /**
     * See test/e2e/local-auth.spec.ts
     * need username, password in body
     * skip guard to @Public when using global guard
     */
    @ApiBody({
        type     : LocalLoginDto,
        examples : {
            user1 : {
                value : {
                    username : 'user1',
                    password : '123',
                },
            },
            user2 : {
                value : {
                    username : 'user2',
                    password : '123',
                },
            },
        },
    })
    @Post('login')
    @UseGuards(LocalLoginGuard)
    public login(@Req() req: Request): Payload | undefined {
        return req.user;
    }

    @Get('logout')
    public logout(@Req() req: Request, @Res() res: Response): void {
        req.logout((err: any): void => {
            this.logger.error(err);
        });
        res.redirect('/');
    }

    @Get('check')
    @UseGuards(AuthenticatedGuard)
    public check(@ReqUser() user: Payload): Payload | undefined {
        return user;
    }

    /**
     * See test/e2e/jwt-auth.spec.ts
     */
    @ApiBody({
        type     : LocalLoginDto,
        examples : {
            user1 : {
                value : {
                    username : 'user1',
                    password : '123',
                },
            },
            user2 : {
                value : {
                    username : 'user2',
                    password : '123',
                },
            },
        },
    })
    @UseGuards(LocalAuthGuard)
    @Post('jwt/login')
    public jwtLogin(@Req() req: Request): { access_token: string } {
        return this.auth.signJwt(<Payload>req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('jwt/check')
    public jwtCheck(@ReqUser() user: Payload): Payload | undefined {
        return user;
    }
}
