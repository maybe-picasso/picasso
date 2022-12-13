import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(data: RegisterUserDto): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ userId: id }).exec();
  }

  getAll(): string {
    return 'this is getAll()';
  }
}
