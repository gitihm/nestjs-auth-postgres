import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/address/entity/address.entity';
import { IUser, User } from './entity/user.entity';
import { Repositories } from './user.providers';

@Injectable()
export class UserService {
  constructor(
    @Inject(Repositories.UserRepository)
    private readonly user: typeof User,
    //address
    @Inject(Repositories.AddressRepository)
    private readonly address: typeof Address,
  ) {}

  async create(data: IUser) {
    return this.user.create(data);
  }

  async gets() {
    return this.user.findAll();
  }

  async get(options={}) {
    return this.user.findOne(options);
    // return this.user.findAll(options);
  }

  async getByUsername(username: string) {
    return this.user.findOne({ where: { username: username }, raw: true });
  }

  //address
  async createAddress(data) {
    return this.address.create(data);
  }

  async getsAddress(options = {}) {
    return this.address.findOne(options);
    // return this.address.findAll(options);
  }
}
