import { Inject, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersRepositories } from './user.providers';

@Injectable()
export class UserService {
  constructor(
    @Inject(UsersRepositories.UserRepository)
    private readonly user: typeof User,
  ) {}

  async create(data: User) {
    return this.user.create(data);
  }

  async gets() {
    return this.user.findAll();
  }

  async getByUsername(username: string) {
    return this.user.findOne({ where: { username: username } });
  }
}
