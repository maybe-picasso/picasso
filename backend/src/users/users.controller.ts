import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  getAll() {
    return this.users.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This is getOne() ${id}`;
  }

  @Post()
  create() {
    return 'This is create()';
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This is delete() ${id}`;
  }
}
