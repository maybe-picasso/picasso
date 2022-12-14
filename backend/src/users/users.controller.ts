import { Controller, Delete, Get, Patch, Param, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Get()
  async findAll() {
    const result = await this.users.findAll();
    return result;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.users.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
