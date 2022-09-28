import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entity/user';
import { FoobarService } from './foobar.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FoobarService],
  exports: [FoobarService],
})
export class FoobarModule {}
