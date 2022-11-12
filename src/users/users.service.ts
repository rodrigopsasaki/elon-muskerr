import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(username: string) {
    const user = this.repository.create({ username, createdAt: new Date() });
    await this.repository.insert(user);
  }

  async list() {
    return this.repository.find({});
  }
}
