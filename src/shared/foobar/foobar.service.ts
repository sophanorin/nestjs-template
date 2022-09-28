import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user';

@Injectable()
export class FoobarService {
  constructor(
    @InjectRepository(User)
    private user_table: Repository<User>,
  ) {}

  public async getFoobars(): Promise<User[]> {
    return this.user_table.find({ take: 10 });
  }
}
