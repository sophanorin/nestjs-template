import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user';

@Injectable()
export class FoobarService {
    constructor(
        @InjectRepository(User)
        private userTable: Repository<User>,
    ) {}

    public async getFoobars(): Promise<User[]> {
        return this.userTable.find({ take: 10 });
    }
}
