import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import * as dotenv from 'dotenv';
dotenv.config();

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  private readonly JWT_SESSION_TIME = 3600 * 3; // 3600초, 1시간

  constructor(private readonly users: UsersService) {}

  async validateOAuthLogin(profile: Profile, provider: Provider): Promise<string> {
    try {
      const thirdPartyId: string = profile.id;
      const timestamp = new Date().getTime();
      let user: User = await this.users.findOne(thirdPartyId);

      if (!user) {
        const { name, email, picture: profileUrl, locale } = profile._json;
        const userInfo: RegisterUserDto = {
          name,
          email,
          profileUrl,
          locale,
          userId: profile.id,
          registerType: provider,
          registerDate: timestamp,
          lastLoginDate: timestamp,
          avatar: [],
          point: 0,
        };
        user = await this.users.register(userInfo);
      }

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: this.JWT_SESSION_TIME });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
