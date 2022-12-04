import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/*private readonly authService: AuthService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: 'VERY_SECRET_KEY',
      secretOrKey:
        'F6FxJJsv+Vvrjiypovn6+fw/V1Eg6dtgxSMv8TlPux91j7Rrk5r/8g6HaliRtf7AuJjES3VgiEqJPHCrZSb2kwTQ7Bc62LjtMZAtoHTc3BGr2YoK1Zv3gmIo5rup+ITyB3zcWdZwRJQsGPPGk5My6ZnTFS3ZHaOz6tnHeDkThuZeAOEVPNQlFu2sMrWqq3Nzi2xRHP2PizBE9FXiOkQ3E9wg2BJDko79enlBmsbjD85TSg3gshw/Z4Hp0zw9KHPcsOjFXfqiD6V86eQdKZEcmrxQ+NIBnRKhqTUW6/9y5jg0V4CQHAKAS0r2luhNOhRooGkIXkfltI2+HLh7rugo5A==',
    });
  }

  async validate(payload, done: any) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);

      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}
