import { Controller, Delete, Get, Patch, Param, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    const user = req.user;
    const { thirdPartyId } = user;
    return this.findOne(thirdPartyId);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.users.findAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.users.update(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
