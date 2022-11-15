import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll(): string {
    return 'this is getAll()';
  }
}
