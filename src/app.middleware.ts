import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = (process.env.NODE_ENV === 'production');
  const cookieSecret = process.env.COOKIE_SECRET || 'tEsTeD';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.use(compression());
  app.use(session({
    // Requires 'store' setup for production
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  app.use(helmet({ contentSecurityPolicy: isProduction ? undefined : false }));
  app.enableCors();

  return app;
}
