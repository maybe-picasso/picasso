import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, UsersService],
})
export class AuthModule {}
