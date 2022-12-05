import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  // private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key
  private readonly JWT_SECRET_KEY =
    'F6FxJJsv+Vvrjiypovn6+fw/V1Eg6dtgxSMv8TlPux91j7Rrk5r/8g6HaliRtf7AuJjES3VgiEqJPHCrZSb2kwTQ7Bc62LjtMZAtoHTc3BGr2YoK1Zv3gmIo5rup+ITyB3zcWdZwRJQsGPPGk5My6ZnTFS3ZHaOz6tnHeDkThuZeAOEVPNQlFu2sMrWqq3Nzi2xRHP2PizBE9FXiOkQ3E9wg2BJDko79enlBmsbjD85TSg3gshw/Z4Hp0zw9KHPcsOjFXfqiD6V86eQdKZEcmrxQ+NIBnRKhqTUW6/9y5jg0V4CQHAKAS0r2luhNOhRooGkIXkfltI2+HLh7rugo5A==';

  constructor(/*private readonly usersService: UsersService*/) {
    //
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

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
