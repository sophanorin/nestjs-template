import { Payload } from '../src/auth';

export declare global {
  type AnyObject = Record<string, unknown>;

  namespace NodeJS {
      interface ProcessEnv {
          NODE_ENV: string;
          PORT: string;

          DB_TYPE: string;
          DB_HOST: string;
          DB_PORT: string;
          DB_USER: string;
          DB_PASSWORD: string;
          DB_NAME: string;

          JWT_SECRET: string;
          COOKIE_SECRET: string;

          CACHE_TTL: number;
          CACHE_DRIVER: string;
          REDIS_HOST: string;
          REDIS_PORT: number;
          REDIS_USERNAME: string;
          REDIS_PASSWORD: string;

          MONGO_URI: string;
          MONGO_USERNAME: string;
          MONGO_PASSWORD: string;
          MONGO_DATABASE: string;

          ACCESS_KEY_ID: string;
          SECRET_ACCESS_KEY: string;
          REGION: string;
          BUCKET: string;
      }
  }

  namespace Express {
      interface Request {
          id: string;
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-interface
      interface User extends Payload {}
  }
}
