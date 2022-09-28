import { Injectable } from '@nestjs/common';

import type { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 'test',
      password: '123',
      name: 'user1',
      email: `user1@test.com`,
      roles: ['admin'], // ['admin', 'etc', ...]
    },
    {
      id: 'test',
      password: '123',
      name: 'user2',
      email: `user2@test.com`,
      roles: ['test'], // ['admin', 'etc', ...]
    },
  ];

  public async findOne(username: string): Promise<(User & { password: string }) | undefined> {
    return this.users.find((user) => user.name === username);
  }
}
