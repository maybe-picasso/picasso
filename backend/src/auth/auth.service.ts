import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';
dotenv.config();

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  constructor(private readonly usersService: UsersService) {}

  async validateOAuthLogin(profile: Profile, provider: Provider): Promise<string> {
    try {
      const thirdPartyId = profile.id;
      let user: User = await this.usersService.findOne(thirdPartyId);

      if (!user) {
        const userInfo = {
          userId: profile.id,
          displayName: profile.displayName,
          email: profile._json.email,
          profileUrl: profile._json.picture,
          locale: profile._json.locale,
        };
        user = await this.usersService.register(userInfo);
      }

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 }); // 3600초, 1시간
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
