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

  async remove(id: string) {
    const removedData = await this.userModel.findByIdAndRemove({ _id: id }).exec();
    return removedData;
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.findOne(id);
    const newData = {
      ...user,
      ...data,
    };
    console.log('확인 newData :>> ', newData);
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
}
