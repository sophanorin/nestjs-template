import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entity/user';
import { Role } from '../entity/role';
import { FoobarModule } from '../shared/foobar';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      User,
      Role,
    ]),
    FoobarModule, // Shared Module
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class UserModule {}
