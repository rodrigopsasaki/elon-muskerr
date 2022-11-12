import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() { username }) {
    return this.usersService.createUser(username);
  }

  @Get()
  async listAll() {
    return this.usersService.list();
  }
}
