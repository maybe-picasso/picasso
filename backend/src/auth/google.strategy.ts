import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_HOST } = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_HOST}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      const jwt: string = await this.authService.validateOAuthLogin(profile, Provider.GOOGLE);
      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
}
