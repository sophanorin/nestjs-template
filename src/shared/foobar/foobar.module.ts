import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoobarService } from './foobar.service';
import { User } from '../../entity/user';

@Module({
    imports   : [TypeOrmModule.forFeature([User])],
    providers : [FoobarService],
    exports   : [FoobarService],
})
export class FoobarModule {}
