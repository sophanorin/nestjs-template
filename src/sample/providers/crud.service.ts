import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { User } from '../../entity/user';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(User)
    private table: Repository<User>,
  ) {}

  public async create(data: Partial<User>): Promise<User> {
    return this.table.save(data);
  }

  public async read(id: number): Promise<User | undefined> {
    return this.table.findOne(id);
  }

  public async update(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }
}
