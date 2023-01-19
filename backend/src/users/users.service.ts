import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  register(data: RegisterUserDto): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  remove(userId: string) {
    return this.userModel.findOneAndRemove({ userId }).exec();
  }

  update(userId: string, data: Partial<User>) {
    return this.userModel.findOneAndUpdate({ userId }, data).exec();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(userId: string): Promise<User> {
    return this.userModel.findOne({ userId }).exec();
  }
}
