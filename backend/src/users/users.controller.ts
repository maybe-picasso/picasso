import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

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
